import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Category } from '../../model/Model';
import StateText from '../state-text/StateText';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Modal';
import { useState } from 'react';
import CategoryForm from '../form/CategoryForm';
import ConfirmDialog from '../modal/ConfirmDialog';

export interface CategoryTableProps {
    className?: string;
    categories: Category[];
    onDelete?: any;
    onEdit?: any;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    className='',
    categories,
    onDelete,
    onEdit,
}) => {
    const columns:string[] = ["ID", "Category", "State", "Actions"];
    const [deleteModalVisible, setVisibleDeleteModal] = useState<Boolean>(false);
    const [editModalVisible, setVisibleEditModal] = useState<Boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>();


    const openDeleteModal = (category: Category) => {
        setSelectedCategory(category);
        setVisibleDeleteModal(true);
    }
    
    const closeDeleteModal = () => {
        setVisibleDeleteModal(false);
    }
    
    const openEditModal = (category: Category) => {
        setSelectedCategory(category);
        setVisibleEditModal(true);
    }

    const closeEditModal = () => {
        setVisibleEditModal(false);
    }

    const onEditCategory = (category: Category) => {
        if(onEdit) onEdit(category);
        setVisibleEditModal(false);
    } 

    const onDeleteCategory = () => {
        if(onDelete) onDelete(selectedCategory);
        setVisibleDeleteModal(false);
    }
    
    return (
        <Wrapper className={[className, "categorys-table"].join(' ')}>
            <ConfirmDialog 
                visible={deleteModalVisible} 
                message="Are you sure you want to delete this category?" 
                onConfirm={onDeleteCategory} 
                onAbort={closeDeleteModal}/>
            <Modal title="Edit category" show={editModalVisible} onClose={closeEditModal} >
                <CategoryForm postAction={onEditCategory} category={selectedCategory} />
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
                            {categories && categories.map((category:any, index: number) => {
                                return (
                                    <TableRow hover key={category.id}>
                                        <TableCell>{ category.id }</TableCell>
                                        <TableCell>{ category.label }</TableCell>
                                        <TableCell>
                                            <StateText state={category.state || 0} />    
                                        </TableCell>
                                        <TableCell className="table-actions">
                                            <IconButton onClick={() => { openEditModal(category) }} aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => { openDeleteModal(category) }} aria-label="delete">
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
    &.categorys-table {
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

export default CategoryTable;