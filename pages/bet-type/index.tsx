import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import BetTypeTable from '../../components/table/BetTypeTable';
import { GetStaticProps } from 'next';
import BetTypeService from '../../services/bet-type/bet-type.service';
import BetTypeInput from '../../components/form/BetTypeForm';
import TitleBorder from '../../components/border/TitleBorder';
import CategoryService from '../../services/categories/category.service';
import { useState } from 'react';
import { BetType } from '../../model/Model';

const BetTypesPage = (props: any) => {

    const {
        betTypes,
        categories
    } = props;

    const [betTypeList, setBetTypeList] = useState<BetType[]>(betTypes);

    const onAddBetType = async (betType: any) => {
        await BetTypeService.PostBetType(betType)
        .then(data => {
            setBetTypeList([
                ...betTypeList,
                data
            ])
        });
    }

    const onDeleteBetType = async (betType: any) => {
        await BetTypeService.DeleteBetType(betType)
        .then(data => {
            const betTypeList_ = betTypeList.filter((betType_) => betType_.id !== betType.id)
            setBetTypeList(betTypeList_);
        });
    }
    
    const onEditBetType = async (betType: any) => {
        await BetTypeService.EditBetType(betType)
        .then(data => {
            const betTypeList_ = betTypeList.map((betType_) => {
                if(betType_.id === betType.id)
                    return data
                return betType_
            }) 
            setBetTypeList([
                ...betTypeList_,
            ])
        });
    }

    return (
        <PageWrapper>
            <Page>
                <TitleBorder title="New Bet Type">
                    <BetTypeInput postAction={onAddBetType} categories={categories} />
                </TitleBorder>
                <TitleBorder title="Bet Type List">
                    <BetTypeTable betTypes={betTypeList} categories={categories} onDelete={onDeleteBetType} onEdit={onEditBetType} />
                </TitleBorder>
            </Page>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`

`;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const betTypeService = new BetTypeService();
    const categoryService = new CategoryService();
    const betTypes = await betTypeService.getAllBetType();
    const categories = await categoryService.getAllCategories();
    return {
        props: {
            betTypes: betTypes,
            categories
        }
    }
}

export default BetTypesPage;