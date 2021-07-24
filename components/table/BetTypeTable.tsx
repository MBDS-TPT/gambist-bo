import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Category, BetType } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import BetTypeForm from '../form/BetTypeForm';
import ConfirmDialog from '../modal/ConfirmDialog';

export interface BetTypeTableProps {
    className?: string;
    betTypes: BetType[];
    onDelete?: any;
    onEdit?: any;
    categories?: Category[];
}

const BetTypeTable: React.FC<BetTypeTableProps> = ({
    className='',
    betTypes,
    onDelete,
    onEdit,
    categories
}) => {
    const columns:string[] = ["ID", "Label", "Description", "Winning Rate", "Category", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedBetType, setSelectedBetType] = useState<any>();


    const openDeleteModal = (betType: BetType) => {
        setSelectedBetType(betType);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (betType: BetType) => {
        setSelectedBetType(betType);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditBetType = (betType: BetType) => {
        if(onEdit) onEdit(betType);
        setVisibleEditModal(false);
    } 

    const onDeleteBetType = () => {
        if(onDelete) onDelete(selectedBetType);
        setVisibleDeleteModal(false);
    }

    return (
        <Wrapper className={[className, "betType-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this bet type?" 
                onConfirm={onDeleteBetType} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit bet type" show={editModalVisible} onClose={closeEditModal} >
                <BetTypeForm betType={selectedBetType} postAction={onEditBetType} categories={categories || []} />
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
                            {betTypes && betTypes.map((betType, index) => {
                                return (
                                    <TableRow hover key={betType.id}>
                                        <TableCell>{ betType.id }</TableCell>
                                        <TableCell>{ betType.label }</TableCell>
                                        <TableCell>{ betType.description }</TableCell>
                                        <TableCell>{ betType.currentWinningRate } %</TableCell>
                                        <TableCell>{ betType.category?.label }</TableCell>
                                        <TableCell>
                                            <StateText state={betType.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(betType) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(betType) }} aria-label="delete">
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
    &.betType-table {
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

export default BetTypeTable;