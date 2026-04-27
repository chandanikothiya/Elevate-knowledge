import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetquizQuery } from '../../redux/api/quiz.api';
import { useGetquestionQuery } from '../../redux/api/question.api';

function QuizExam(props) {
    const { id } = useParams();
    console.log("Quiz ID:", id);

    const {data:qdata,error:qerror,isLoading:qisloding} = useGetquizQuery();

    const quiz = qdata?.data?.find((v) => v.section_id === id)
    console.log(quiz,quiz?._id)

    const {data,error,isLoading} = useGetquestionQuery();


    const question = data?.data?.find((v) => v.quiz_id === quiz?._id)
    console.log(question)

    return (
        <div>
            <div className="container">
                <h1>quize</h1>
            </div>
        </div>
    );
}

export default QuizExam;