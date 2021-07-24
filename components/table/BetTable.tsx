import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Category, Bet } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import BetForm from '../form/BetForm';
import ConfirmDialog from '../modal/ConfirmDialog';
import DateUtil from '../../utils/date.utils';

export interface BetTableProps {
    className?: string;
    bets: Bet[];
    onDelete?: any;
    onEdit?: any;
}

const BetTable: React.FC<BetTableProps> = ({
    className='',
    bets,
    onDelete,
    onEdit
}) => {
    const columns:string[] = ["ID", "User",  "Value", "Winning rate", "Match", "Date", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedBet, setSelectedBet] = useState<any>();


    const openDeleteModal = (betType: Bet) => {
        setSelectedBet(betType);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (betType: Bet) => {
        setSelectedBet(betType);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditBet = (betType: Bet) => {
        if(onEdit) onEdit(betType);
        setVisibleEditModal(false);
    } 

    const onDeleteBet = () => {
        if(onDelete) onDelete(selectedBet);
        setVisibleDeleteModal(false);
    }

    return (
        <Wrapper className={[className, "betType-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this bet type?" 
                onConfirm={onDeleteBet} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit bet type" show={editModalVisible} onClose={closeEditModal} >
                <BetForm bet={selectedBet} postAction={onEditBet} />
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
                            {bets && bets.map((bet: Bet, index) => {
                                return (
                                    <TableRow hover key={bet.id}>
                                        <TableCell>{ bet.id }</TableCell>
                                        <TableCell>{ `${bet.user.firstname} ${bet.user.lastname }` }</TableCell>
                                        <TableCell>{ bet.betValue }</TableCell>
                                        <TableCell>{ bet.winningRate }%</TableCell>
                                        <TableCell>{ `${bet.match.teamA?.name} - ${bet.match.teamB?.name}` }</TableCell>
                                        <TableCell>{ DateUtil.parseDate(bet.betDate) }</TableCell>
                                        <TableCell>
                                            <StateText state={bet.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(bet) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(bet) }} aria-label="delete">
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

export default BetTable;