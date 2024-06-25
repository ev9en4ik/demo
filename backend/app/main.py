from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from api.routes.country import country_router
from api.routes.news import news_router

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://localhost:8000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(country_router)
app.include_router(news_router)


@app.get('/')
def default_route():
    return {'Hello': 'World'}


