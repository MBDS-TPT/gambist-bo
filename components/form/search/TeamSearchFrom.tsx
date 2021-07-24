import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../../model/Model';
import { Team } from '../../../model/Model';
import { Loader } from '../../svg-icons/Icons';

export interface TeamSearchFormProps {
    className?: string;
    categories: Category[];
    onSearch?: any;
}

const TeamSearchForm: React.FC<TeamSearchFormProps> = ({
    className='',
    categories=[],
    onSearch
}) => {    
    const [category, setCategory] = useState<Category>(categories[0]);
    const [teamName, setTeamName] = useState<string>("");
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const handleChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id === id)[0]);
    }

    const handleTeamNameInput = (e: any) => {
        setTeamName(e.target.value);
    }

    const onSubmit = async () => {
        const team_ = {
            name: teamName,
            categoryId: category.id
        };
        if(onSearch) {
            showLoader(true);
            await onSearch(team_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'team-input'].join(' ')}>
            <form className={'inline-form' }>
                <TextField value={teamName} 
                    className="team-name" 
                    onChange={handleTeamNameInput} 
                    id='s-team-name' 
                    label='Team name' variant='outlined' />
                <FormControl variant="outlined" className='team-category'>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={category?.id || 1}
                        onChange={handleChange}
                        label="Category"
                        inputProps={{
                            name: 's-category',
                            id: 's-category',
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
                    Search
                </Button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.team-input {
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
    .team-category {
        width: 200px;
    }
    .submit-button {
        bottom: 1px;
    }
`;

export default TeamSearchForm;