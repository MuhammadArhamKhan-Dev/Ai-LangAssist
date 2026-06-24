from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.prompts import ChatPromptTemplate


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
key = os.getenv("API_KEY")

llm = ChatOpenAI(
    model="google/gemma-4-31b-it:free",
    api_key=key,
    base_url="https://openrouter.ai/api/v1"
)


@tool
def translate_to_english(text: str) -> str:
    """Translate Urdu to English"""
    return llm.invoke(f"Translate Urdu to English:\n{text}").content


@tool
def translate_to_urdu(text: str) -> str:
    """Translate English to Urdu"""
    return llm.invoke(f"Translate English to Urdu:\n{text}").content

@tool
def summarize_text(text):
    """Summarize the given text"""
    return llm.invoke(f"Summarize the following text:\n{text}").content

@tool
def correct_grammar(text):
    """Correct the grammar of the given text"""
    return llm.invoke(f"Correct the grammar of the following text:\n{text}").content

@tool
def professional_writing(text):
    """Convert the given text into professional writing"""
    return llm.invoke(f"Convert the following text into professional writing:\n{text}").content

tools = [translate_to_english, translate_to_urdu, summarize_text, correct_grammar, professional_writing]

llm_with_tools = llm.bind_tools(tools)

prompt = ChatPromptTemplate.from_messages([
    ("system",
     """
You are a smart multilingual agent.

Your job:
- Detect language automatically
- If Urdu → use translate_to_english tool
- If English → use translate_to_urdu tool
- If summarize → use summarize_text tool
- If correct_grammar → use correct_grammar tool
- If professional_writing → use professional_writing tool
- If unclear → respond normally

Always choose the correct tool when needed.
"""),
    ("user", "{input}")
])

agent_chain = prompt | llm_with_tools

class TranslationRequest(BaseModel):
    text: str
    task: str


@app.post("/translate")
def translate(data: TranslationRequest):

    if data.task == "translate":
        response = llm.invoke(
            f"Translate:\n{data.text}"
        )

    elif data.task == "summarize":
        response = summarize_text.invoke(
            {"text": data.text}
        )

    elif data.task == "grammar":
        response = correct_grammar.invoke(
            {"text": data.text}
        )

    elif data.task == "professional":
        response = professional_writing.invoke(
            {"text": data.text}
        )
    if hasattr(response, "content"):
        response = response.content
    return {
        "result": response
    }
