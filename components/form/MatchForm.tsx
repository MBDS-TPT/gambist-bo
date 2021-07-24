import { Button, FormControl, FormHelperText, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category, Team } from '../../model/Model';
import { Match } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface MatchFormProps {
    className?: string;
    categories: Category[];
    teams: Team[];
    postAction?: any;
    match?: Match;
    blockForm?: Boolean;
}

const MatchForm: React.FC<MatchFormProps> = ({
    className='',
    categories=[],
    postAction,
    teams,
    match,
    blockForm=false
}) => {    
    const matchCategory = categories.filter((category) => category.id === match?.category?.id)[0];
    const [category, setCategory] = useState<Category>(matchCategory ? matchCategory : categories[0]);
    const [teamA, setTeamA] = useState<Team>(teams[0]);
    const [teamB, setTeamB] = useState<Team>(teams[1]);
    const [date, setDate] = useState<any>(new Date());
    const [teamAError, setTeamAError] = useState<string>();
    const [teamBError, setTeamBError] = useState<string>();
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const sameTeamErrorMessage = "{team} has already been selected"

    const handleDateChange = (e: any) => {
        setDate(e.target.value)
    }

    const handleCategoryChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id === id)[0]);
    }

    const handleTeamChange = (e: any) => {
        const isTeamB = e.target.id === "teamB";
        const id = e.target.value;
        const team = teams.filter((team) => team.id == id)[0]
        if(!isTeamB) {
            if(teamB && team.id === teamB.id) {
                setTeamAError(`${sameTeamErrorMessage.replace('{team}', team.name)} as team B`);
                setTeamBError('')
            } else {
                setTeamAError('')
                setTeamBError('')
                setTeamA(team)
            }
        }
        else {
            if(teamA && team.id === teamA.id) {
                setTeamBError(`${sameTeamErrorMessage.replace('{team}', team.name)} as team A`);
                setTeamAError('')
            }
            else {
                setTeamBError('')
                setTeamAError('')
                setTeamB(team)
            }
        };
        console.log(teamA?.name, teamB?.name)
    }

    const isEditMode = () => {
        return !!match;
    } 

    const onSubmit = async () => {
        const d = new Date(date)
        // const dateTmp = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:00`
        const match_: Match = {
            id: match ? match.id : '0',
            categoryId: category.id,
            teamAId: teamA.id,
            teamBId: teamB.id,
            matchDate: d
        };
        if(postAction) {
            showLoader(true);
            await postAction(match_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'match-input'].join(' ')}>
            <form className={ blockForm ? 'block-form' : 'inline-form' }>
                <FormControl variant="outlined" className='match-category'>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={category?.id || ""}
                        onChange={handleCategoryChange}
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
                <FormControl variant="outlined" className='match-teamA' error={!!teamAError}>
                    <InputLabel htmlFor="teamA">Team A</InputLabel>
                    <Select
                        native
                        value={teamA?.id}
                        onChange={handleTeamChange}
                        label="Team A"
                        inputProps={{
                            name: 'team A',
                            id: 'teamA',
                        }}
                    >
                        {teams.map((team: Team) => {
                            return <option key={team.id} value={team.id}>{ team.name }</option>
                        })}
                    </Select>
                    {teamAError && <FormHelperText>{ teamAError }</FormHelperText>}
                </FormControl>
                <FormControl variant="outlined" className='match-teamB' error={!!teamBError}>
                    <InputLabel htmlFor="teamB">Team B</InputLabel>
                    <Select
                        native
                        value={teamB?.id}
                        onChange={handleTeamChange}
                        label="Team B"
                        inputProps={{
                            name: 'team B',
                            id: 'teamB',
                        }}
                    >
                        {teams.map((team: Team) => {
                            return <option key={team.id} value={team.id}>{ team.name }</option>
                        })}
                    </Select>
                    {teamBError && <FormHelperText>{ teamBError }</FormHelperText>}
                </FormControl>
                <FormControl variant="outlined" className="match-date">
                    <TextField
                        variant="outlined"
                        id="datetime-local"
                        label="Match date"
                        type="datetime-local"
                        value={date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
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
    &.match-input {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .inline-form {
        flex-direction: row;
        display: flex;
        width: 800px;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .block-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .match-category,
        .match-teamA,
        .match-teamB,
        .match-date {
            width: 100%;
        }
        .match-date {
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
    .match-category {
        width: 200px;
    }
    .submit-button {
        bottom: 1px;
    }
    .match-category,
    .match-teamA,
    .match-teamB,
    .match-date {
        margin-bottom: 10px;
    }
`;

export default MatchForm;