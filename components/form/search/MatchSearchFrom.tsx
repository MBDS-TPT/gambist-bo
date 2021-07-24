import { Button, FormControl, FormHelperText, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Category, Match, Team } from '../../../model/Model';
import { Loader } from '../../svg-icons/Icons';

export interface MatchSearchFormProps {
    className?: string;
    categories: Category[];
    teams: Team[];
    onSearch?: any;
    match?: Match;
}

const MatchSearchForm: React.FC<MatchSearchFormProps> = ({
    className='',
    categories=[],
    onSearch,
    teams,
    match
}) => {    
    const matchCategory = categories.filter((category) => category.id === match?.category?.id)[0];
    const [category, setCategory] = useState<Category>(matchCategory ? matchCategory : categories[0]);
    const [teamA, setTeamA] = useState<Team>(teams[0]);
    const [teamB, setTeamB] = useState<Team>(teams[1]);
    const [date, setDate] = useState<any>();
    const [date2, setDate2] = useState<any>();
    const [teamAError, setTeamAError] = useState<string>();
    const [teamBError, setTeamBError] = useState<string>();
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    useEffect(()=> {
        if(teams[0].id !== '-1') {
            teams.unshift({
                id: "-1",
                name: '--- None ---'
            });
        }
    }, [])

    const sameTeamErrorMessage = "{team} has already been selected"

    const handleDateChange = (e: any) => {
        if(e.target.id === "date1")
            setDate(e.target.value)
        else setDate2(e.target.value)
    }

    const handleCategoryChange = (e: any) => {
        const id = e.target.value;
        setCategory(categories.filter((category) => category.id == id)[0]);
    }

    const handleTeamChange = (e: any) => {
        const isTeamB = e.target.id === "teamB";
        const id = e.target.value;
        const team = teams.filter((team) => team.id == id)[0]
        if(!isTeamB) {
            if(teamB && team.id === teamB.id && id > 0) {
                setTeamAError(`${sameTeamErrorMessage.replace('{team}', team.name)} as team B`);
                setTeamBError('')
            } else {
                setTeamAError('')
                setTeamBError('')
                setTeamA(team)
            }
        }
        else {
            if(teamA && team.id === teamA.id && id > 0) {
                setTeamBError(`${sameTeamErrorMessage.replace('{team}', team.name)} as team A`);
                setTeamAError('')
            }
            else {
                setTeamBError('')
                setTeamAError('')
                setTeamB(team)
            }
        };
    }

    const isEditMode = () => {
        return !!match;
    } 

    const onSubmit = async () => {
        let date_ = null;
        if(date) date_ = new Date(date).toISOString();
        let date2_ = null;
        if(date2) date2_ = new Date(date2).toISOString();
        const searchCriteria: any = {};
        if(category.id !== "-1") searchCriteria['categoryId'] = category.id
        if(teamA.id !== "-1") searchCriteria['teamAId'] = teamA.id;
        if(teamB.id !== "-1") searchCriteria['teamBId'] = teamB.id;
        if(date_) searchCriteria['date1'] = date_;
        if(date2_) searchCriteria['date2'] = date2_;
        if(onSearch) {
            showLoader(true);
            await onSearch(searchCriteria);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'match-input'].join(' ')}>
            <form className={ isEditMode() ? 'block-form' : 'inline-form' }>
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
                        id="date1"
                        label="Date between"
                        type="datetime-local"
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl variant="outlined" className="match-date">
                    <TextField
                        variant="outlined"
                        id="date2"
                        label="And"
                        type="datetime-local"
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
                    {"Search"}
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

export default MatchSearchForm;