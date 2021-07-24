import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import TeamsTable from '../../components/table/TeamsTable';
import { GetStaticProps } from 'next';
import TeamService from '../../services/teams/team.service';
import TeamInput from '../../components/form/TeamInput';
import TitleBorder from '../../components/border/TitleBorder';
import CategoryService from '../../services/categories/category.service';
import { useState } from 'react';
import { Category, Team } from '../../model/Model';
import TeamSearchForm from '../../components/form/search/TeamSearchFrom';
import { PageResultList } from '../../model/ApiModel';
import TablePagination from '@material-ui/core/TablePagination';
import Modal from '../../components/modal/Modal';
import TeamForm from '../../components/form/TeamForm';

interface PageProps {
    teams: PageResultList<Team>;
    categories: Category[];
}

const TeamsPage = (props: PageProps) => {

    const {
        teams,
        categories
    } = props;

    const [teamList, setTeamList] = useState<Team[]>(teams.data);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [dataLoading, setDataLoading] = useState<Boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(teams.totalCount);
    const [modalVisible, setModalVisible] = useState<Boolean>(false);

    const onAddTeam = async (team: any) => {
        await TeamService.PostTeam(team)
        .then(data => {
            setTeamList([
                data,
                ...teamList
            ])
            setModalVisible(false);
        });
    }

    const onDeleteTeam = async (team: any) => {
        await TeamService.DeleteTeam(team)
        .then(data => {
            const teamList_ = teamList.filter((team_) => team_.id !== team.id)
            setTeamList(teamList_);
        });
    }
    
    const onEditTeam = async (team: any) => {
        await TeamService.EditTeam(team)
        .then(data => {
            const teamList_ = teamList.map((team_) => {
                if(team_.id === team.id)
                    return team
                return team_
            }) 
            setTeamList([
                ...teamList_,
            ])
        });
    }

    const onSearchTeam = async (searchQuery: any) => {
        await TeamService.getPaginatedTeam(currentPage, rowsPerPage, searchQuery)
        .then(res => {
            setTeamList(res.data)
            setTotalCount(res.totalCount)
        })
    }

    const onChangePage = async (e: any, page: number) => {
        setDataLoading(true);
        const result = await TeamService.getPaginatedTeam(page, rowsPerPage);
        if(result) {
            setTeamList([
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
                <Modal show={modalVisible} onClose={onCloseModal}>
                    <TeamForm blockForm postAction={onAddTeam} categories={categories} />
                </Modal>
                <div className="page-actions">                
                    <Button variant="contained" color="primary" onClick={openAddModal} >Add</Button>
                </div>
                <TitleBorder title="Serach Team">
                    <TeamSearchForm onSearch={onSearchTeam} categories={categories} />
                </TitleBorder>
                <TitleBorder title="Team List">
                    <TeamsTable teams={teamList} categories={categories} onDelete={onDeleteTeam} onEdit={onEditTeam} />
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

export const getStaticProps: GetStaticProps = async (ctx) => {
    const teamService = new TeamService();
    const categoryService = new CategoryService();
    const teams = await teamService.getAllTeam();
    const categories = await categoryService.getAllCategories();
    return {
        props: {
            teams: teams,
            categories
        }
    }
}

export default TeamsPage;