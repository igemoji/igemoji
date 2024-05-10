from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

app = FastAPI()

class AnswerData(BaseModel):
    user_answer: str
    correct_answer: str

class YourResponseModel(BaseModel):
    user_input: str
    similarity_score: float


@app.post("/similar", response_model=YourResponseModel)
async def compare_answers(postData: AnswerData):
    def load_data():
        return pd.read_csv('final_movie.csv')


    def create_tfidf_embeddings(texts):
        vectorizer = TfidfVectorizer(analyzer='word')
        tfidf_matrix = vectorizer.fit_transform(texts)
        return tfidf_matrix, vectorizer


    def create_tfidf_embeddings2(texts):
        vectorizer = TfidfVectorizer(analyzer='char')
        tfidf_matrix = vectorizer.fit_transform(texts)
        return tfidf_matrix, vectorizer

    def calculate_tfidf_similarity(input_text, tfidf_matrix, vectorizer, movies_df, answer_title):
        input_tfidf = vectorizer.transform([input_text])
        similarities = cosine_similarity(input_tfidf, tfidf_matrix)[0]
        
        if input_text.lower() == answer_title.lower():
            index = movies_df.index[movies_df['영화 제목'].str.lower() == answer_title.lower()].tolist()[0]
            similarities[index] = 1.0
            return similarities
        
            # Adjust the similarity based on word inclusion
        # 단어 포함 관계 검사를 위해 입력과 정답을 모두 소문자로 변환
        input_text_lower = input_text.lower()
        answer_text_lower = answer_title.lower()
        
        # 부분 문자열 포함 여부 확인
        if input_text_lower in answer_text_lower or answer_text_lower in input_text_lower:
            # print(f"가중치 적용: '{input_text}'과(와) '{answer_title}'는 서로 포함 관계에 있는 단어가 있습니다.")
            answer_index = movies_df.index[movies_df['영화 제목'].str.lower() == answer_title.lower()].tolist()[0]
            similarities[answer_index] *= 10  # 가중치 적용
        
        if answer_title in movies_df['영화 제목'].values:
            movie_data = movies_df.loc[movies_df['영화 제목'] == answer_title].iloc[0]
            actors = [actor.strip().lower() for actor in movie_data['영화 배우'].split(',')]
            roles = [role.strip().lower() for role in movie_data['영화 배역'].split(',')]
            role_names = [role.split(' 역')[0].strip().lower() for role in roles if ' 역' in role]  # '역' 이름 부분만 추출

            if input_text.lower() in actors or input_text.lower() in roles or input_text.lower() in role_names:
                # print(f"가중치 적용: '{input_text}'은(는) '{answer_title}'의 배우, 배역 또는 역할 이름 중 하나에 일치합니다.")
                index = movies_df.index[movies_df['영화 제목'] == answer_title].tolist()[0]
                similarities[index] *= 5  # 가중치 적용


        return similarities


    def calculate_tfidf_similarity2(input_text, tfidf_matrix, vectorizer, index=None):
        input_tfidf = vectorizer.transform([input_text])
        if index is not None:
            target_tfidf = tfidf_matrix[index]
            similarity = cosine_similarity(input_tfidf, target_tfidf)[0][0]
            return similarity
        else:
            similarities = cosine_similarity(input_tfidf, tfidf_matrix)[0]
            return similarities
    
    def custom_strip(input_text):
    # 유니코드 공백 문자를 포함한 모든 공백 제거
        return re.sub(r'\s+', '', input_text)


    user_input = custom_strip(postData.user_answer)
    print(user_input)
    answer = custom_strip(postData.correct_answer)
    print(answer)
    
    data = load_data()
    texts = data['text'].tolist()
    movie_titles = data['영화 제목'].tolist()

    
    if user_input in movie_titles:
        tfidf_matrix, vectorizer = create_tfidf_embeddings(texts)
        # if answer in movie_titles:
        user_index = movie_titles.index(user_input)
        answer_index = movie_titles.index(answer)
        similarity_score = calculate_tfidf_similarity2(texts[user_index], tfidf_matrix, vectorizer, index=answer_index)
        similarity_score *= 5 
        # print(f"{user_input}와(과) {answer} 간의 유사도 점수: {similarity_score*100:.1f}")
        return {"user_input": postData.user_answer, "similarity_score": min(100, float(f"{similarity_score*100:.1f}"))}
    else:
        tfidf_matrix, vectorizer = create_tfidf_embeddings2(texts)

        similarity_scores = calculate_tfidf_similarity(user_input, tfidf_matrix, vectorizer, data, answer)

        if answer in movie_titles:
            answer_index = movie_titles.index(answer)
            # print(f"{answer} 영화와의 유사도 점수: {similarity_scores[answer_index]:.4f} ")
            return {"user_input": postData.user_answer, "similarity_score": min(float(f"{similarity_scores[answer_index]*100:.1f}"), 100)}
