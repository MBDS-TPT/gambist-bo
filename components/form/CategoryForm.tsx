import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface CategoryFormProps {
    className?: string;
    postAction: any;
    category?: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    className='',
    postAction,
    category
}) => {    
    const [categoryName, setCategoryName] = useState<string>(category?.label || "");
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const handleCategoryNameInput = (e: any) => {
        setCategoryName(e.target.value);
    }

    const isEditMode = () => {
        return !!category;
    } 

    const onSubmit = async () => {
        const category_: Category = {
            id: category ? category.id : '0',
            label: categoryName
        };
        if(postAction) {
            showLoader(true);
            await postAction(category_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'category-input'].join(' ')}>
            <form className={ isEditMode() ? 'block-form' : 'inline-form' }>
                <TextField value={categoryName} 
                    className="category-name" 
                    onChange={handleCategoryNameInput} 
                    id='category-name' 
                    label='Category name' variant='outlined' />
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
    &.category-input {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .inline-form {
        flex-direction: row;
        display: flex;
        width: 600px;
        justify-content: space-around;
    }
    .block-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .category-name {
            width: 100%;
        }
        .submit-button {
            width: 50%;
        }
        padding: 40px;
        height: auto;
        min-height: 400px;
        width: 500px;
    }
    .submit-button {
        bottom: 1px;
    }
`;

export default CategoryForm;