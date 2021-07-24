import React, { useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import { GetStaticProps } from 'next';
import TitleBorder from '../../components/border/TitleBorder';
import CategoryService from '../../services/categories/category.service';
import CategoryTable from '../../components/table/CategoryTable';
import { Category } from '../../model/Model';
import CategoryForm from '../../components/form/CategoryForm';

const CategoriesPage = (props: any) => {

    const {
        categories
    } = props;

    const [categoryList, setCategoryList] = useState<Category[]>(categories);

    const onAddCategory = async (category: any) => {
        await CategoryService.PostCategory(category)
        .then(data => {
            setCategoryList([
                ...categoryList,
                data
            ])
        });
    }

    const onDeleteCategory = async (category: any) => {
        await CategoryService.DeleteCategory(category)
        .then(data => {
            const categoryList_ = categoryList.filter((category_) => category_.id !== category.id)
            setCategoryList(categoryList_);
        });
    }
    
    const onEditCategory = async (category: any) => {
        await CategoryService.EditCategory(category)
        .then(data => {
            const categoryList_ = categoryList.map((category_) => {
                if(category_.id === category.id)
                    return category
                return category_
            }) 
            setCategoryList([
                ...categoryList_,
            ])
        });
    }

    return (
        <PageWrapper>
            <Page>
                <TitleBorder title="New Category">
                    <CategoryForm postAction={onAddCategory} />
                </TitleBorder>
                <TitleBorder title="Category List">
                    <CategoryTable 
                        onDelete={onDeleteCategory} 
                        onEdit={onEditCategory} 
                        categories={categoryList} />
                </TitleBorder>
            </Page>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`

`;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const categoryService = new CategoryService();
    const categories = await categoryService.getAllCategories();
    return {
        props: {
            categories: categories
        }
    }
}

export default CategoriesPage;