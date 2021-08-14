import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Category, Team } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import TeamForm from '../form/TeamForm';
import ConfirmDialog from '../modal/ConfirmDialog';

export interface TeamsTableProps {
    className?: string;
    teams: Team[];
    onDelete?: any;
    onEdit?: any;
    categories?: Category[];
}

const TeamsTable: React.FC<TeamsTableProps> = ({
    className='',
    teams,
    onDelete,
    onEdit,
    categories
}) => {
    const columns:string[] = ["ID", "Logo", "Team name", "Category", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<any>();


    const openDeleteModal = (team: Team) => {
        setSelectedTeam(team);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (team: Team) => {
        setSelectedTeam(team);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditTeam = (team: Team) => {
        if(onEdit) onEdit(team);
        setVisibleEditModal(false);
    } 

    const onDeleteTeam = () => {
        if(onDelete) onDelete(selectedTeam);
        setVisibleDeleteModal(false);
    }

    return (
        <Wrapper className={[className, "teams-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this team?" 
                onConfirm={onDeleteTeam} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit team" show={editModalVisible} onClose={closeEditModal} >
                <TeamForm postAction={onEditTeam} team={selectedTeam} categories={categories || []} />
            </Modal>
            <Paper>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell className="table-header" key={`${column}-${index}`}> { column }</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams && teams.map((team, index) => {
                                return (
                                    <TableRow hover key={team.id}>
                                        <TableCell>{ team.id }</TableCell>
                                        <TableCell>
                                            <div className="team-logo">
                                                <img src={ team.logo } alt={ team.name }/>
                                            </div>
                                        </TableCell>
                                        <TableCell>{ team.name }</TableCell>
                                        <TableCell>{ team.category?.label }</TableCell>
                                        <TableCell>
                                            <StateText state={team.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(team) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(team) }} aria-label="delete">
                                                <DeleteIcon color="error" />
                                            </IconButton>
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
    &.teams-table {
        padding: 10px;
        /*background-color: #f5f5f5;*/
        border-radius: 5px;
    }
    .team-logo {
        width: auto;
        height: 60px;
        display: flex;
    }
    .team-logo img {
        width: auto;
        height: 60px;
        margin: auto;
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
        height: 95px;
    }
`;

export default TeamsTable;