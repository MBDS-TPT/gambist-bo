import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import { BetType } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface BetTypeFormProps {
    className?: string;
    categories: Category[];
    postAction?: any;
    betType?: BetType;
}

const BetTypeForm: React.FC<BetTypeFormProps> = ({
    className='',
    categories=[],
    postAction,
    betType
}) => {    
    const betTypeCategory = categories.filter((category) => category.id === betType?.categoryId)[0];
    const [category, setCategory] = useState<Category>(betTypeCategory ? betTypeCategory : categories[0]);
    const [betTypeLabel, setBetTypeLabel] = useState<string>(betType?.label || "");
    const [betTypeDescription, setBetTypeDescription] = useState<string>(betType?.description || "");
    const [currentWinningRate, setCurrentWinningRate] = useState<number>(betType?.currentWinningRate || 0);
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const handleChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id == id)[0]);
        console.log(categories, category);
    }

    const handleLabelInput = (e: any) => {
        setBetTypeLabel(e.target.value);
    }

    const handleDescriptionInput = (e: any) => {
        setBetTypeDescription(e.target.value);
    }

    const handleCurrentWinningRateInput = (e: any) => {
        setCurrentWinningRate(e.target.value);
    }

    const isEditMode = () => {
        return !!betType;
    } 

    const onSubmit = async () => {
        const betType_: BetType = {
            id: betType ? betType.id : '0',
            label: betTypeLabel,
            description: betTypeDescription,
            currentWinningRate: currentWinningRate,
            categoryId: category.id
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
                <TextField value={betTypeLabel} 
                    className="bet-type-label" 
                    onChange={handleLabelInput} 
                    id='bet-type-label' 
                    label='Bet Type Label' variant='outlined' />
                <TextField value={betTypeDescription} 
                    className="bet-type-label" 
                    onChange={handleDescriptionInput} 
                    id='bet-type-description' 
                    label='Bet Type Description' variant='outlined' />
                <TextField value={currentWinningRate} 
                    className="winning-rate" 
                    onChange={handleCurrentWinningRateInput} 
                    type="Number"
                    id='winning-rate' 
                    label='Winning Rate' variant='outlined' />
                <FormControl variant="outlined" className='betType-category'>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={category?.id || 1}
                        onChange={handleChange}
                        label="Category"
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                    >
                        {categories.map((category) => {
                            return <option key={category.id} value={category.id}>{ category.label }</option>
                        })}
                    </Select>
                </FormControl>
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

export default BetTypeForm;