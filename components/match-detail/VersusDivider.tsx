import React from 'react';
import styled from 'styled-components';

export interface VersusDividerProps {
    className?: string;
    matchDay: string;
    matchMonthAndYear: string;
}

const VersusDivider:React.FC<VersusDividerProps> = ({
    className='',
    matchDay,
    matchMonthAndYear
}) => {

    return (
        <Wrapper className={["versus", className].join(' ')} >
            <time className="versus-date" dateTime="2020-04-17">
                <span className="versus-day">{ matchDay }</span> 
                <span className="versus-month">{ matchMonthAndYear }</span>
            </time>
            <div className="versus-bar">
                <span className="vs-bar"></span>
                <span className="vs-text">VS</span>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.versus {
        min-width: 150px;
        padding: 24px 0 10px 0;
    }
    .versus-date {
        text-align: center;
        span {
            display: block;
            font-weight: 600;
            text-transform: uppercase;
        }
        .versus-day {
            color: var(--green);
            font-size: 33px;
        }
        .versus-month {
            color: var(--gray);
        }
    }
    .versus-bar {
        padding: 0 15px;
        text-align: center;
        margin-top: 15px;
    }
    .vs-bar {
        display: block;
        height: 1px;
        background-color: var(--border-gray);
        width: 100%;
    }
    .versus-bar .vs-text {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid var(--border-gray);
        text-align: center;
        color: var(--green);
        font-weight: 600;
        display: block;
        font-size: 14px;
        padding-top: 3px;
        margin: auto;
        margin-top: -15px;
        background-color: white;
    }
`;

export default VersusDivider;