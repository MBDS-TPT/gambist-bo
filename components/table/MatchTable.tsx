import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Category, Match, Team } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton, TablePagination } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import MatchForm from '../form/MatchForm';
import ConfirmDialog from '../modal/ConfirmDialog';
import Loader from '../loader/Loader';
import EndMatchForm from '../form/EndMatchForm';
import { useEffect } from 'react';
import DateUtil from '../../utils/date.utils';

export interface MatchTableProps {
    className?: string;
    matches: Match[];
    teams: Team[];
    categories: Category[];
    onDelete?: Function;
    onEdit?: Function;
    onLoad?: Boolean;
    showEditScoreLoader?: Boolean;
    onEditScore?: Function;
    onEndMatch?: Function;
    changePage?: any;
    showEndMatchLoader?: Boolean;
}

const MatchTable: React.FC<MatchTableProps> = ({
    className='',
    matches,
    onDelete,
    onEdit,
    onEditScore,
    onEndMatch,
    categories=[],
    teams=[],
    onLoad=false,
    showEditScoreLoader=false,
    showEndMatchLoader=false
}) => {
    const columns:string[] = ["ID", "Team A", "Team B", "Category", "Date", "Time", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<any>();
    const [matchList, setMatchList] = useState<Match[]>(matches); 

    const [endMatchModalVisible, setEndMatchModalVisible] = useState<Boolean>(false);

    const openDeleteModal = (match: Match) => {
        setSelectedMatch(match);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (match: Match) => {
        setSelectedMatch(match);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const openEndMatchModal = (match: Match) => {
        setSelectedMatch(match);
        setEndMatchModalVisible(true);
    }

    const onCloseEndMatchModal = (e: any) => {
        setEndMatchModalVisible(false);
    }    

    const onEditMatch = (match: Match) => {
        if(onEdit) onEdit(match);
        setVisibleEditModal(false);
    } 

    const onDeleteMatch = () => {
        if(onDelete) onDelete(selectedMatch);
        setVisibleDeleteModal(false);
    }

    const _onEditScore = (match: any) => {
        if(onEditScore) onEditScore(match, () => {
            setEndMatchModalVisible(false);
        });
    }
    const _onEndMatch = (match: any) => {
        if(onEndMatch) onEndMatch(match, () => {
            setEndMatchModalVisible(false);
        });
    }

    const formatDate = (match: Match) => {
        const date = match.matchDate
        const _match = {...match}
        _match.matchDate = DateUtil.parseDate(date)
        _match.matchTime = DateUtil.getTime(date)
        return _match
    }

    useEffect(() => {
        setMatchList(matches.map((match) => formatDate(match))) 
    }, [matches]);

    const scoreIcon = (
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 319.98 319.98" fill="var(--green)" width="30px" height="30px" xmlSpace="preserve">
            <g>
                <path d="M288.624,67.456h-14.426V44.378c0-3.59-2.91-6.5-6.5-6.5s-6.5,2.91-6.5,6.5v23.078H58.782V44.378c0-3.59-2.91-6.5-6.5-6.5
                    s-6.5,2.91-6.5,6.5v23.078H31.357C14.067,67.456,0,81.523,0,98.813v151.933c0,17.29,14.067,31.357,31.357,31.357h257.267
                    c17.29,0,31.356-14.067,31.356-31.357V98.813C319.98,81.523,305.914,67.456,288.624,67.456z M306.98,98.813v25.578H166.494V80.456
                    h122.13C298.745,80.456,306.98,88.691,306.98,98.813z M31.357,80.456h122.137v43.935H13V98.813
                    C13,88.691,21.235,80.456,31.357,80.456z M13,250.745V137.39h140.494v131.712H31.357C21.235,269.102,13,260.867,13,250.745z
                    M288.624,269.102h-122.13V137.39H306.98v113.355C306.98,260.867,298.745,269.102,288.624,269.102z"/>
                <path d="M84.039,156.4h-1.58c-15.551,0-28.203,12.652-28.203,28.203v37.05c0,15.551,12.652,28.203,28.203,28.203h1.58
                    c15.551,0,28.203-12.652,28.203-28.203v-37.05C112.242,169.052,99.59,156.4,84.039,156.4z M99.242,221.653
                    c0,8.383-6.82,15.203-15.203,15.203h-1.58c-8.383,0-15.203-6.82-15.203-15.203v-37.05c0-8.383,6.82-15.203,15.203-15.203h1.58
                    c8.383,0,15.203,6.82,15.203,15.203V221.653z"/>
                <path d="M237.598,156.4h-1.58c-15.551,0-28.203,12.652-28.203,28.203v37.05c0,15.551,12.652,28.203,28.203,28.203h1.58
                    c15.551,0,28.203-12.652,28.203-28.203v-37.05C265.801,169.052,253.149,156.4,237.598,156.4z M252.801,221.653
                    c0,8.383-6.82,15.203-15.203,15.203h-1.58c-8.383,0-15.203-6.82-15.203-15.203v-37.05c0-8.383,6.82-15.203,15.203-15.203h1.58
                    c8.383,0,15.203,6.82,15.203,15.203V221.653z"/>
            </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        </svg>
    );

    return (
        <Wrapper className={[className, "matches-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this match?" 
                onConfirm={onDeleteMatch} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit match" show={editModalVisible} onClose={closeEditModal} >
                <MatchForm categories={categories} teams={teams} postAction={onEditMatch} match={selectedMatch} />
            </Modal>
            
            <Modal title="Edit Score" onClose={onCloseEndMatchModal} show={endMatchModalVisible}>
                <EndMatchForm onEndMatch={_onEndMatch} showEndMatchLoader={showEndMatchLoader} showLoader={showEditScoreLoader} onEditScore={_onEditScore} match={selectedMatch} />
            </Modal>
            <Paper>
                <TableContainer className="table-container">  
                    {onLoad && <Loader/>}
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell className="table-header" key={`${column}-${index}`}> { column }</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchList && matchList.map((match: Match, index: number) => {
                                return (
                                    <TableRow hover key={match.id}>
                                        <TableCell>{ match.id }</TableCell>
                                        <TableCell>{ match.teamA?.name }</TableCell>
                                        <TableCell>{ match.teamB?.name }</TableCell>
                                        <TableCell>{ match.category?.label }</TableCell>
                                        <TableCell>{ match.matchDate }</TableCell>
                                        <TableCell>{ match.matchTime }</TableCell>
                                        <TableCell>
                                            <StateText state={match.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(match) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(match) }} aria-label="delete">
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                            <Button className="end-match-btn" onClick={() => { openEndMatchModal(matches[index]) }} aria-label="end">
                                                {scoreIcon}
                                            </Button>
                                            {/* <IconButton onClick={() => { openEditModal(match) }} aria-label="edit">
                                                <EditIcon/> Score
                                            </IconButton> */}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.matches-table {
        padding: 10px;
        /*background-color: #f5f5f5;*/
        border-radius: 5px;
    }
    .table-header {
        font-weight: 700;
        font-size: 14px;
    }
    .table-header:last-child {
        text-align: center;
    }
    .table-actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        min-height: 95px;
    }
    .table-container {
        position: relative;
    }
`;

export default MatchTable;