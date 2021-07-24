import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { User } from '../../model/Model';
import { Loader } from '../svg-icons/Icons';

export interface UserFormProps {
    className?: string;
    postAction: any;
    user?: User;
}

const UserForm: React.FC<UserFormProps> = ({
    className='',
    postAction,
    user
}) => {    
    const [username, setUsername] = useState<string>(user?.username || "");
    const [lastname, setLastname] = useState<string>(user?.lastname || "");
    const [firstname, setFirstname] = useState<string>(user?.firstname || "");
    const [password, setPassword] = useState<string>(user?.password || "");
    const [email, setEmail] = useState<string>(user?.email || "");
    const [dayOfBirth, setDayOfBirth] = useState<string>(user?.dayOfBirth || "");
    const [loaderVisible, showLoader] = useState<Boolean>(false);

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }

    const handleFirstnameChange = (e: any) => {
        setFirstname(e.target.value);
    }

    const handleLastnameChange = (e: any) => {
        setLastname(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleDayOfBirthChange = (e: any) => {
        setDayOfBirth(e.target.value);
    }

    const isEditMode = () => {
        return !!user;
    } 

    const onSubmit = async () => {
        const user_: User = {
            id: user ? user.id : '0',
            username: username,
            lastname: lastname,
            firstname: firstname,
            dayOfBirth: new Date(dayOfBirth),
            email: email,
            password: password
        };
        if(postAction) {
            showLoader(true);
            await postAction(user_);
            showLoader(false);
        }
    }
    
    return (
        <Wrapper className={[className, 'user-input'].join(' ')}>
            <form className={ isEditMode() ? 'block-form' : 'inline-form' }>
                <TextField value={firstname} 
                    className="firstname" 
                    onChange={handleFirstnameChange} 
                    id='firstname' 
                    label='Firstname' variant='outlined' />
                <TextField value={lastname} 
                    className="lastname" 
                    onChange={handleLastnameChange} 
                    id='lastname' 
                    label='Lastname' variant='outlined' />
                <TextField value={username} 
                    className="username" 
                    onChange={handleUsernameChange} 
                    id='username' 
                    label='Username' variant='outlined' />
                <TextField value={password} 
                    className="password" 
                    onChange={handlePasswordChange} 
                    id='password' 
                    label='Password' variant='outlined' />
                <TextField value={email} 
                    className="email" 
                    onChange={handleEmailChange} 
                    id='email' 
                    label='Email' variant='outlined' />
                <TextField value={dayOfBirth} 
                    className="day-of-birth" 
                    type="datetime-local"
                    onChange={handleDayOfBirthChange} 
                    id='day-of-birth'
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    label='Day of birth' variant='outlined' />
                <Button onClick={onSubmit} 
                    className="submit-button"
                    variant="contained" 
                    color="primary"
                    startIcon={loaderVisible && <Loader width={35} color='var(--white)' bgColor={'transparent'}/>}
                    >
                    {isEditMode() ? "Edit": "Create"}
                </Button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.user-input {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .inline-form {
        flex-direction: row;
        display: flex;
        justify-content: space-around;
    }
    .block-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .user-name,
        .firstname,
        .lastname,
        .username,
        .email, 
        .password,
        .day-of-birth {
            width: 100%;
            margin-bottom: 10px;
        }
        .submit-button {
            width: 50%;
        }
        padding: 40px;
        height: auto;
        min-height: 400px;
        width: 500px;
    }
    .submit-button {
        bottom: 1px;
    }
`;

export default UserForm;