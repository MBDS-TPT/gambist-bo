import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { User } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import UserForm from '../form/UserForm';
import ConfirmDialog from '../modal/ConfirmDialog';

export interface UserTableProps {
    className?: string;
    users: User[];
    onDelete?: any;
    onEdit?: any;
}

const UserTable: React.FC<UserTableProps> = ({
    className='',
    users,
    onDelete,
    onEdit,
}) => {
    const columns:string[] = ["ID", "Firstname", "Lastname", "Username", "Email", "Day of birth", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>();


    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditUser = (user: User) => {
        if(onEdit) onEdit(user);
        setVisibleEditModal(false);
    } 

    const onDeleteUser = () => {
        if(onDelete) onDelete(selectedUser);
        setVisibleDeleteModal(false);
    }
    
    return (
        <Wrapper className={[className, "users-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this user?" 
                onConfirm={onDeleteUser} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit user" show={editModalVisible} onClose={closeEditModal} >
                <UserForm postAction={onEditUser} user={selectedUser} />
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
                            {users && users.map((user, index: number) => {
                                return (
                                    <TableRow hover key={user.id}>
                                        <TableCell>{ user.id }</TableCell>
                                        <TableCell>{ user.firstname }</TableCell>
                                        <TableCell>{ user.lastname }</TableCell>
                                        <TableCell>{ user.username }</TableCell>
                                        <TableCell>{ user.email }</TableCell>
                                        <TableCell>{ user.dayOfBirth }</TableCell>
                                        <TableCell>
                                            <StateText state={user.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(user) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(user) }} aria-label="delete">
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
    &.users-table {
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

export default UserTable;