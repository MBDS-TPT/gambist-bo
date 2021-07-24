import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import { Bet } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface BetFormProps {
    className?: string;
    postAction?: any;
    bet?: Bet;
}

const BetForm: React.FC<BetFormProps> = ({
    className='',
    postAction,
    bet
}) => {    
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const isEditMode = () => {
        return !!bet;
    } 

    const onSubmit = async () => {
        const betType_: any = {
            
        };
        if(postAction) {
            showLoader(true);
            await postAction(betType_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'betType-input'].join(' ')}>
            <form className={ isEditMode() ? 'block-form' : 'inline-form' }>
                
                <Button onClick={onSubmit} 
                    className="submit-button"
                    variant="contained" 
                    color="primary"
                    startIcon={loaderVisible && <Loader width={35} color='var(--white)' bgColor={'transparent'}/>}
                    >
                    {isEditMode() ? "Edit": "Create"}
                </Button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.betType-input {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .inline-form {
        flex-direction: row;
        display: flex;
        width: 900px;
        justify-content: space-around;
    }
    .block-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .bet-type-label, 
        .bet-type-category,
        .winning-rate,
        .betType-category {
            width: 100%;
        }
        .betType-category {
            margin-bottom: 30px;
        }
        .submit-button {
            width: 50%;
        }
        padding: 40px;
        height: auto;
        min-height: 400px;
        width: 500px;
    }
    .betType-category {
        width: 200px;
    }
    .submit-button {
        bottom: 1px;
    }
`;

export default BetForm;