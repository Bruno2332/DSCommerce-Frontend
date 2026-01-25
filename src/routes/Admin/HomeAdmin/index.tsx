import { useEffect, useState } from 'react';
import './styles.css'
import type { UserDTO } from '../../../models/user';
import * as userService from '../../../services/user-service'

export default function HomeAdmin() {

    const [user, setUser] = useState<UserDTO>();

    useEffect(() => {
        userService.findMe()
            .then(response => {
                setUser(response.data);
            })
    }, [])

    return (

        <section id="admin-area-section" className="container">
            <h2 className="section-title mb20">Bem Vindo à área administrativa {user?.name}</h2>
        </section>
    );
}