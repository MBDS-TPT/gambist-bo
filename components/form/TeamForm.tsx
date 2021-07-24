import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import { Team } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface TeamFormProps {
    className?: string;
    categories: Category[];
    postAction?: any;
    team?: Team;
    blockForm?: Boolean;
}

const TeamForm: React.FC<TeamFormProps> = ({
    className='',
    categories=[],
    postAction,
    team,
    blockForm=false
}) => {    
    const teamCategory = categories.filter((category) => category.id === team?.categoryId)[0];
    const [category, setCategory] = useState<Category>(teamCategory ? teamCategory : categories[0]);
    const [teamName, setTeamName] = useState<string>(team?.name || "");
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const handleChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id === id)[0]);
    }

    const handleTeamNameInput = (e: any) => {
        setTeamName(e.target.value);
    }

    const isEditMode = () => {
        return !!team;
    } 

    const onSubmit = async () => {
        const team_: Team = {
            id: team ? team.id : '0',
            logo: "",
            name: teamName,
            categoryId: category.id
        };
        if(postAction) {
            showLoader(true);
            await postAction(team_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'team-input'].join(' ')}>
            <form className={ blockForm ? 'block-form' : 'inline-form' }>
                <TextField value={teamName} 
                    className="team-name" 
                    onChange={handleTeamNameInput} 
                    id='team-name' 
                    label='Team name' variant='outlined' />
                <FormControl variant="outlined" className='team-category'>
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
    .block-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .team-name, 
        .team-category {
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
    .team-category {
        width: 200px;
    }
    .submit-button {
        bottom: 1px;
    }
`;

export default TeamForm;