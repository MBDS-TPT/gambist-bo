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
import ModelName, { GetTableColumn, GetTableData } from './TableUtils';

export interface DynamicTableProps {
    className?: string;
    objects: any[];
    onDelete?: any;
    onEdit?: any;
    categories?: Category[];
    modelName: string;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    className='',
    objects,
    onDelete,
    onEdit,
    categories,
    modelName
}) => {
    const columns:string[] = [...GetTableColumn(modelName), "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<any>();
    
    const data: any = GetTableData(ModelName.CATEGORY, objects);

    const openDeleteModal = (team: any) => {
        setSelectedTeam(team);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (team: any) => {
        setSelectedTeam(team);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditTeam = (team: any) => {
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
                            {data && data.map((row:any, index: any) => {
                                return (
                                    <TableRow hover key={index}>
                                        {row && row.map((col: any, index: number) => {
                                            return (
                                                <TableCell key={index}>
                                                    {(!col?.state) ? col.state : (
                                                        <StateText state={col.state} />
                                                    )}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(objects[index]) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(objects[index]) }} aria-label="delete">
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
    }
`;

export default DynamicTable;