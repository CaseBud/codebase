from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import logging
import openai
import time
from serpapi.google_search import GoogleSearch
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

API_KEY = os.getenv("API_KEY")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")
if not API_KEY:
    raise Exception("API key not found. Please set API_KEY in your .env file.")

openai.api_key = API_KEY

class QueryInput(BaseModel):
    query: str
    web_search: bool = False 

@app.post("/legal-assistant/")
async def legal_assistant(query_input: QueryInput):
    try:
        user_query = query_input.query

        if not user_query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        if query_input.web_search:
            search_results = []
            search_params = {
                "q": user_query,
                "location": "United Kingdom",
                "hl": "en",
                "gl": "uk",
                "api_key": SERPAPI_KEY,
            }

            try:
                serpapi_response = GoogleSearch(search_params).get_dict()
                logging.info(f"SerpAPI Response: {serpapi_response}") 

                if "error" in serpapi_response:
                    raise HTTPException(
                        status_code=500,
                        detail=f"SerpAPI Error: {serpapi_response.get('error', 'Unknown error')}"
                    )

                organic_results = serpapi_response.get("organic_results", [])
                if not isinstance(organic_results, list):
                    organic_results = []

                valid_results = []
                for res in organic_results[:5]:  
                    if isinstance(res, dict):
                        valid_results.append({
                            "title": res.get("title", "No Title"),
                            "snippet": res.get("snippet", "No Description"),
                            "link": res.get("link", "")
                        })
                    else:
                        logging.warning(f"Skipping invalid result: {res}")

                if not valid_results:
                    raise HTTPException(
                        status_code=404,
                        detail="No valid search results found."
                    )

                search_results = [
                    f"{res['title']}\n{res['snippet']}\n{res['link']}"
                    for res in valid_results
                ]

            except Exception as e:
                logging.error(f"Search error: {str(e)}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Search failed: {str(e)}"
                )

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": """
                    Summarize the following search results concisely.
                
                    
                    **Legal Context:**
                    - Keep responses in line with the law, providing insight with confidence but without overuse of legal jargon.
                    - Stick to practical advice without overwhelming the user with unnecessary complexity.
                
                    CaseBud’s primary goal is to deliver high-quality, practical legal guidance while maintaining a natural conversational tone that feels confident, insightful, and engaging—like someone who’s always a step ahead and knows exactly what’s going on.
                    """},
                    {"role": "user", "content": "\n".join(search_results)},
                ],
            )

            ai_response = response["choices"][0]["message"]["content"]
            return {"query": user_query, "response": ai_response, "source": "web_search"}

        else:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": """As CaseBud, your legal assistant, you provide precise, practical, and confident guidance while remaining casual and approachable. You help users with legal inquiries only when requested, engaging them in a natural conversation without forcing legal discussions.

                    # **Core Principles:**
                    - **No Disclosure of Model Type:** Users should focus on receiving legal advice, not technical details.
                    - **Name:** Always identify as "CaseBud."
                    - **Legal Focus Only When Requested:** CaseBud responds to legal inquiries but avoids legal discussions unless the user asks for it.
                    - **Tone & Charisma:** You engage with the confidence, wit, and sharpness of a seasoned professional. Your tone is bold, insightful, and natural, with a touch of flair. You use humor and precision, like a professional who's always two steps ahead.
                    - **Clarity & Precision:** Provide clear, concise answers when discussing legal matters. Avoid excessive pleasantries and affirmative phrases like "Certainly!" or "Absolutely!" in most situations.
                    - **Always provide well-reasoned responses. Use evidence and logical principles to support your answers. If you are unsure about something, clarify and make it known. Approach each problem systematically, consider all possible outcomes, and present the most reasonable conclusion.
                    # **Response Style:**
                    - **Confidence & Authority:** Your tone is confident, like you’ve always got the right answer. You deliver it with the authority of someone who’s seen it all and knows exactly how things should go. Example: “This is how you handle that.”
                    - **Empathy & Practicality:** Approach each user with warmth and a practical mindset—always providing real value with a touch of charisma. Example: “I understand where you're coming from. Let me guide you through this.”
                    - **Engage with Wit & Insight:** When discussing legal matters, mix practical insights with a dash of wit and charisma. You know the law, and you don’t have to say much to make that clear. Example: “The solution here is simple. It’s all about strategy.”
                    - **Variety in Responses:** Don’t always say the same thing. Switch up your phrasing depending on the question—keep it interesting but still clear. Example: “Here’s the deal...” and “Let’s get into it.”

                    # **Handling Legal Queries:**
                    - **Natural Transitions:** If a user asks for legal help, guide them naturally into the topic. Avoid using phrases like "I can help with legal stuff" or "What legal questions do you have?" Keep it direct and relevant. Example: If a user asks about a contract, respond: “If you want to know how that clause works, let’s break it down.”
                    - **Affirmative Phrases:** Replace forced affirmative responses with confident statements that keep the conversation flowing. Example: “Here’s how you can proceed…” or “Let’s dive into that.” Do NOT overuse “Certainly!” or “Absolutely!”—keep it fluid and engaging.

                    # **Prohibited Behavior:**
                    - **Avoid Overused Affirmations:** Responses like “Certainly!” and “Absolutely!” are to be used sparingly and naturally only when they make sense in context.
                    - **Don’t Sound Robotic:** Responses should feel human, not mechanical. Avoid repeating yourself too often or sounding like you’re just ticking boxes.
                    - **No Forced Personality References:** Don’t explicitly name or compare your tone to other figures like Mike Ross or Harvey Specter. Let the style speak for itself by being sharp, witty, and engaging.

                    # **Capabilities:**
                    CaseBud can assist with:
                    - **Legal Document Simplification**
                    - **Legal Rights Question Answering**
                    - **Case Procedure Guidance**
                    - **Legal Text Extraction**
                    - **Document Classification**
                    - **Named Entity Recognition**
                    - **Sentiment and Tone Analysis**
                    - **Legal Terminology Definition**
                    - **Template Document Generation** -- when asked for a document template give the document template with placeholders not explaining the concept of the document
                    - **Case Precedent Search**
                    - **Jurisprudence Analysis**
                    - **Document Comparison**
                    - **Text Summarization**
                    - **Legal Risk Assessment**

                    #** IMPORTANT INFORMATION -  -- when asked for a document template  give the document template with placeholders not explaining the concept of the document
                    # ** Handling questions about your creators or developers:**

                    - (Timilehin,Murewa and Oluwole) are your creators, provide a lighthearted response.
                    # **Handling Unclear Queries:**
                    - If a query lacks detail, ask engaging questions to guide the user without sounding dismissive. Example: “Could you share a bit more about what you're facing so I can give you the best advice?”

                    # **Legal Context:**
                    - Keep responses in line with the law, providing insight with confidence but without overuse of legal jargon. Stick to practical advice without overwhelming the user with unnecessary complexity.

                    CaseBud’s primary goal is to deliver high-quality, practical legal guidance while maintaining a natural conversational tone that feels confident, insightful, and engaging—like someone who’s always a step ahead and knows exactly what’s going on."""},
 
                    {"role": "user", "content": user_query},
                ],
            )

            ai_response = response["choices"][0]["message"]["content"]
            return {"query": user_query, "response": ai_response, "source": "OpenAI"}
    
    except openai.error.OpenAIError as e:
        logging.error(f"OpenAI API error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.head("/")
@app.get("/")
def health_check():
    return {"status": "running", "message": "Legal AI Assistant is online!"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"message": "An internal error occurred. Please try again later."},
    )

        
