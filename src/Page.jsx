import Navbar from './navbar/Navbar.jsx';
import Body from './body/Body.jsx';
import Home from './home/Home.jsx';
import Header from './body/Header.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPage, getPages, getPageList, getPostsList } from './requests';

export default function Page() {

    const [events, setEvents] = useState([]);
    const [projects, setProjects] = useState([]);
    const [parties, setParties] = useState([]);

    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const saveSessionData = async () => {
            let allPosts = [];
            const pages = await getPages();
            for (const { posts } of pages) for (const post of posts) allPosts.push(post);
            sessionStorage.setItem('pages', JSON.stringify(pages));
            sessionStorage.setItem('posts', JSON.stringify(allPosts));
        }
        saveSessionData();

        const getPostsFromSession = async () => {
            const storage = sessionStorage.getItem('posts');
            if (storage) return JSON.parse(storage); 
            else return false;
        }

        const getPagesFromSession = async () => {
            const storage = sessionStorage.getItem('pages');
            if (storage) return JSON.parse(storage); 
            else return [];
        }

        const servePage = async () => {
            const pagesFromSession = await getPagesFromSession();
            const route = location.pathname.substring(1);
            const postsFromSession = pagesFromSession.find(p => p.data.route === route);
            if (postsFromSession) setPage(postsFromSession);
            else setPage(await getPage(route));
        }
        servePage();

        const servePageList = async () => {
            let list = [];
            let query;
            const pagesFromSession = await getPagesFromSession();
            if (pagesFromSession.length) query = pagesFromSession;
            else query = await getPageList();
            for (const { data: { title, route, type} } of query) list.push({ title, route, type });
            setEvents(list.filter(p => p.type === 'event'));
            setParties(list.filter(p => p.type === 'party'));
            setProjects(list.filter(p => p.type === 'project'));
        }
        servePageList();

        const servePostsList = async () => {
            let allPosts = [];
            const postsFromSession = await getPostsFromSession();
            if (postsFromSession) allPosts = postsFromSession;
            else allPosts = await getPostsList();
            setPosts(allPosts.reverse());
        }
        servePostsList();

    }, [location])

    if (page) return (
        <>
            <Navbar events={events} projects={projects} parties={parties} />
            {location.pathname === '/' && <Home/>}
            {location.pathname === '/' && <Body posts={posts} />}
            {location.pathname !== '/' && <Header title={page.data.title} description={page.data.description}/>}
            {location.pathname !== '/' && <Body posts={page.posts} />}
        </>
    ) 

    else return (<></>)
}