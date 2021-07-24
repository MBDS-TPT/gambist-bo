import React from 'react';
import styled from 'styled-components';
import Page from '../../components/page-wrapper/Page';
import UserTable from '../../components/table/UserTable';
import { GetStaticProps } from 'next';
import UserForm from '../../components/form/UserForm';
import TitleBorder from '../../components/border/TitleBorder';
import { useState } from 'react';
import UserService from '../../services/users/user.service';
import CategoryService from '../../services/categories/category.service';
import TeamService from '../../services/teams/team.service';
import { useEffect } from 'react';
import DateUtil from '../../utils/date.utils';
import { User } from '../../model/Model';

interface PageProps {
    users: User[];
}

const UsersPage = (props: PageProps) => {

    const {
        users
    } = props;

    const [userList, setUserList] = useState<User[]>(users);

    const onAddUser = async (user: any) => {
        await UserService.PostUser(user)
        .then(data => {
            setUserList([
                ...userList,
                data
            ])
        });
    }

    const onDeleteUser = async (user: any) => {
        await UserService.DeleteUser(user)
        .then(data => {
            const userList_ = userList.filter((user_) => user_.id !== user.id)
            setUserList(userList_);
        });
    }
    
    const onEditUser = async (user: any) => {
        await UserService.EditUser(user)
        .then(data => {
            const userList_ = userList.map((user_) => {
                if(user_.id === user.id)
                    return data
                return user_
            })
            setUserList([
                ...userList_,
            ])
        });
    }

    return (
        <PageWrapper>
            <Page>
                <TitleBorder title="New User">
                    <UserForm postAction={onAddUser}  />
                </TitleBorder>
                <TitleBorder title="User List">
                    <UserTable users={userList} onDelete={onDeleteUser} onEdit={onEditUser} />
                </TitleBorder>
            </Page>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`

`;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const userService = new UserService();
    const teamService = new TeamService();
    const categoryService = new CategoryService();
    const users = await userService.getAllUser();
    const categories = await categoryService.getAllCategories();
    const teams = await teamService.getAllTeam();
    return {
        props: {
            users: users
        }
    }
}

export default UsersPage;