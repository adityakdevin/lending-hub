import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import Layout from '../../components/Layout';
import MortgageFields from '../../components/mortgages/MortgageFields';
import RegisterForm from '../../components/RegisterForm';

const QuestionnaireModal = (props) => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({});

    const setValue = async (key, value) => {
        let data = selections;
        data[key]= value;
        await setSelections(data);
        setStep(step + 1);
    }

    const submitAnswers = (key, value) => {
        navigate('/mortgages/listing', {
            state: { selections },
          });
    }

    const getSelectedMortgageType = () => {
        const id = props?.location?.state?.id
        let mortgageType = 'Home Buying';
        if (id === 2) {
            mortgageType = 'Refinance'
        } else if (id === 3) {
            mortgageType = 'Renewal'
        } else {
            mortgageType = 'Home Buying'
        }
        return mortgageType
    }

    return(
        <Layout>
        <QuestionnaireModalContainer>
            <div className="container">
            {/* <div className="modal-background"></div> */}
                <div className="">
                    {step === 1 && <MortgageFields type={getSelectedMortgageType()} setValue={setValue} />}
                    {step === 2 && <RegisterForm submitText="Get Rates" setValue={submitAnswers} />}
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </QuestionnaireModalContainer>
        </Layout>
    )
}

const QuestionnaireModalContainer = styled.div`
    background-color: #FFFFFF;
    min-height: 1000px;
    height: fit-content;
`

export default QuestionnaireModal;
