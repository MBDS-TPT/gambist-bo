import React from 'react';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import MatchTable from '../../components/table/MatchTable';
import { GetServerSideProps, GetStaticProps } from 'next';
import MatchForm from '../../components/form/MatchForm';
import TitleBorder from '../../components/border/TitleBorder';
import { useState } from 'react';
import { Category, Match, Team } from '../../model/Model';
import MatchService from '../../services/matches/match.service';
import CategoryService from '../../services/categories/category.service';
import TeamService from '../../services/teams/team.service';
import { useEffect } from 'react';
import DateUtil from '../../utils/date.utils';
import TablePagination from '@material-ui/core/TablePagination';
import { PageResultList } from '../../model/ApiModel';
import MatchSearchForm from '../../components/form/search/MatchSearchFrom';
import Button from '@material-ui/core/Button';
import Modal from '../../components/modal/Modal';
import EndMatchForm from '../../components/form/EndMatchForm';

interface PageProps {
    matches: PageResultList<Match>;
    categories: Category[];
    teams: Team[];
}

const MatchsPage = (props: PageProps) => {

    const {
        matches,
        categories,
        teams
    } = props;

    const [matchList, setMatchList] = useState<Match[]>(matches.data);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [dataLoading, setDataLoading] = useState<Boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(matches.totalCount);
    const [modalVisible, setModalVisible] = useState<Boolean>(false);
    const [editScoreLoaderVisible, setEditScoreLoaderVisible] = useState<Boolean>(false);

    useEffect(()=>{
        if(matches) {
            setMatchList(matches.data.map((match) => { 
                return (match)
            }))
        }
    }, [])

    const onAddMatch = async (match: any) => {
        await MatchService.PostMatch(match)
        .then(data => {
            setMatchList([
                data,
                ...matchList
            ])
            setModalVisible(false);
        });
    }

    const onDeleteMatch = async (match: any) => {
        await MatchService.DeleteMatch(match)
        .then(data => {
            const matchList_ = matchList.filter((match_) => match_.id !== match.id)
            setMatchList(matchList_);
        });
    }
    
    const onEditMatch = async (match: any) => {
        await MatchService.EditMatch(match)
        .then(data => {
            const matchList_ = matchList.map((match_) => {
                if(match_.id === match.id)
                    return data
                return match_
            })
            setMatchList([
                ...matchList_,
            ])
        });
    }

    const onEditScore = async (match: any, callback?: Function) => {
        setEditScoreLoaderVisible(true);
        await MatchService.UpdateScore(match)
        .then(data => {
            const matchList_ = matchList.map((match_) => {
                if(match_.id === match.id)
                    return (data)
                return match_
            })
            setMatchList([
                ...matchList_,
            ])
            setTimeout(() => {
                if(callback) callback();
                setEditScoreLoaderVisible(false);
            }, 2000);
        }).catch((err)=>{
            if(callback) callback();
        });
    }

    const onSearch = async (searchQuery: any) => {
        setCurrentPage(0);
        const result = await MatchService.getPaginatedMatch(currentPage, rowsPerPage, searchQuery)
        setMatchList([
            ...result.data,
        ])
        setTotalCount(result.totalCount)
    }
    
    const onChangePage = async (e: any, page: number) => {
        setDataLoading(true);
        const result = await MatchService.getPaginatedMatch(page, rowsPerPage);
        if(result) {
            // const matchList_ = result.data.map((match: any) => {
            //     return (match)
            // })
            console.log(result.data[0].id)
            setMatchList([
                ...result.data,
            ])
            setCurrentPage(page);
        }
        setDataLoading(false);
    }

    const onChangeRowsPerPage = (e: any) => {
        setRowsPerPage(e.target.value)
    }

    const openAddModal = (e: any) => {
        setModalVisible(true);
    }

    const onCloseModal = (e: any) => {
        setModalVisible(false);
    }

    return (
        <PageWrapper>
            <Page>
                <Modal onClose={onCloseModal} show={modalVisible}>
                    <MatchForm blockForm teams={teams} postAction={onAddMatch} categories={categories} />
                </Modal>
                <div className="page-actions">                
                    <Button variant="contained" color="primary" onClick={openAddModal} >Add</Button>
                </div>
                <TitleBorder title="Search Match">
                    <MatchSearchForm teams={teams} onSearch={onSearch} categories={categories} />
                </TitleBorder>
                <TitleBorder title="Match List">
                    <MatchTable 
                        showEditScoreLoader={editScoreLoaderVisible}
                        onEditScore={onEditScore} 
                        onLoad={dataLoading} 
                        matches={matchList} 
                        teams={teams} 
                        categories={categories} 
                        onDelete={onDeleteMatch} 
                        onEdit={onEditMatch} />
                    <TablePagination
                        component="div"
                        count={totalCount}
                        page={currentPage}
                        onChangePage={onChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                    />
                </TitleBorder>
            </Page>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    .page-actions {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-end;
    }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const matchService = new MatchService();
    const teamService = new TeamService();
    const categoryService = new CategoryService();
    const matches = await MatchService.getPaginatedMatch(0, 10);
    const categories = await categoryService.getAllCategories();
    const teams = await teamService.getAllTeam();
    return {
        props: {
            matches: matches,
            categories,
            teams: teams.data
        }
    }
}

export default MatchsPage;