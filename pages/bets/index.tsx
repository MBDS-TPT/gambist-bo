import React from 'react';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import BetTable from '../../components/table/BetTable';
import { GetStaticProps } from 'next';
import BetForm from '../../components/form/BetForm';
import TitleBorder from '../../components/border/TitleBorder';
import { useState } from 'react';
import BetService from '../../services/bet/bet.service';
import CategoryService from '../../services/categories/category.service';
import TeamService from '../../services/teams/team.service';
import { Bet } from '../../model/Model';

interface PageProps {
    bets: Bet[];
}

const BetsPage = (props: PageProps) => {

    const {
        bets
    } = props;

    const [betList, setBetList] = useState<Bet[]>(bets);

    const onAddBet = async (bet: any) => {
        await BetService.PostBet(bet)
        .then(data => {
            setBetList([
                ...betList,
                data
            ])
        });
    }

    const onDeleteBet = async (bet: any) => {
        await BetService.DeleteBet(bet)
        .then(data => {
            const betList_ = betList.filter((bet_) => bet_.id !== bet.id)
            setBetList(betList_);
        });
    }
    
    const onEditBet = async (bet: any) => {
        await BetService.EditBet(bet)
        .then(data => {
            const betList_ = betList.map((bet_) => {
                if(bet_.id === bet.id)
                    return data
                return bet_
            })
            setBetList([
                ...betList_,
            ])
        });
    }

    return (
        <PageWrapper>
            <Page>
                <TitleBorder title="New Bet">
                    <BetForm postAction={onAddBet}  />
                </TitleBorder>
                <TitleBorder title="Bet List">
                    <BetTable bets={betList} onDelete={onDeleteBet} onEdit={onEditBet} />
                </TitleBorder>
            </Page>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`

`;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const betService = new BetService();
    const teamService = new TeamService();
    const categoryService = new CategoryService();
    const bets = await betService.getAllBet();
    const categories = await categoryService.getAllCategories();
    const teams = await teamService.getAllTeam();
    return {
        props: {
            bets: bets || []
        }
    }
}

export default BetsPage;