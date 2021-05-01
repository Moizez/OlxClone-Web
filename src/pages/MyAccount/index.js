import React, { useState, useEffect } from "react";
import {
    Container,
    Title,
    ErrorMessage
} from "../../components/MainStyles";
import useApi from "../../services/api";
import { ProfileArea, MyAdsArea } from "./styles";
import Item from "../../components/Item";

const MyAccount = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [uf, setUF] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [ufsList, setUfsList] = useState([]);
    const [ads, setAds] = useState([]);
    const api = useApi();

    useEffect(() => {
        async function getProfile() {
            const response = await api.profile();
            setName(response.data.name);
            setEmail(response.data.email);
            setUF(response.data.state);
            setAds(response.data.ads);
        }
        getProfile();
    }, [api]);

    useEffect(() => {
        async function getStates() {
            const list = await api.getStates();
            setUfsList(list.data);
        }
        getStates();
    }, [api]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setDisabled((prevState) => !disabled);
        setError("");

        const data = {}
        data.name = name;
        data.email = email;
        data.state = uf;

        if (password) {
            data.password = password;
            data.password_confirmation = confirmationPassword;
        }

        const response = await api.updateProfile(data);

        if (!response.error) {
            alert('Atualizado com sucesso.')
        } else {
            setError('Erro ao atualizar');
        }

        setDisabled(false);
    };

    return (
        <Container>
            <Title>Perfil</Title>
            <ProfileArea>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={onSubmit}>
                    <label className="input-label">
                        <div className="input--title">Nome</div>
                        <div className="input--field">
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>
                    <label className="input-label">
                        <div className="input--title">E-mail</div>
                        <div className="input--field">
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>
                    <label className="input-label">
                        <div className="input--title">Senha</div>
                        <div className="input--field">
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={disabled}
                            />
                        </div>
                    </label>
                    <label className="input-label">
                        <div className="input--title">Confirmar Senha</div>
                        <div className="input--field">
                            <input
                                type="password"
                                value={confirmationPassword}
                                onChange={(event) => setConfirmationPassword(event.target.value)}
                                disabled={disabled}
                            />
                        </div>
                    </label>
                    <label className="input-label">
                        <div className="input--title">Estado</div>
                        <div className="input--checkbox">
                            <select
                                type="checkbox"
                                value={uf}
                                onChange={(event) => setUF(event.target.value)}
                                disabled={disabled}
                            >
                                {ufsList.length > 0 && ufsList.map(item => (
                                    <option key={item.slug} value={item.slug}>{item.slug}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label className="input-label">
                        <div className="input--title"></div>
                        <div className="input--field">
                            <button disabled={disabled}>Atualizar</button>
                        </div>
                    </label>
                </form>
            </ProfileArea>
            <MyAdsArea>
                {ads && (
                    <>
                        <h2>Seus anúncios</h2>
                        <div className="list">
                            {ads.map((item, key) => (
                                <Item key={key} data={item} />
                            ))}
                        </div>
                    </>
                )}
            </MyAdsArea>
        </Container>
    );
};

export default MyAccount;
