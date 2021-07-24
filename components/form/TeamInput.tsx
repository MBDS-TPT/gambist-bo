import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import { Team } from '../../model/Model';

export interface TeamInputProps {
    className?: string;
    categories: Category[];
    postAction: any;
}

const TeamInput: React.FC<TeamInputProps> = ({
    className='',
    categories=[],
    postAction
}) => {

    const [category, setCategory] = useState<Category>(categories[0]);
    const [teamName, setTeamName] = useState<string>("");

    const handleChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id === id)[0]);
    }

    const handleTeamNameInput = (e: any) => {
        setTeamName(e.target.value);
    }

    const onSubmit = () => {
        const team: Team = {
            name: teamName,
            categoryId: category.id
        };
        postAction(team);
    }
    
    return (
        <Wrapper className={[className, 'team-input'].join(' ')}>
            <form className='inline-form'>
                <TextField value={teamName} onChange={handleTeamNameInput} id='team-name' label='Team name' variant='outlined' />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={category?.id || 0}
                        onChange={handleChange}
                        label="Category"
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                        className='team-category'
                    >
                        {categories.map((category) => {
                            return <option key={category.id} value={category.id}>{ category.label }</option>
                        })}
                    </Select>
                </FormControl>
                <Button onClick={onSubmit} className="submit-button" variant="contained" color="primary">Create</Button>
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

export default TeamInput;