import { useEffect, useState } from 'react';
import Video from './Video.jsx';
import Image from './Image.jsx';
import Normal from './Normal.jsx';

export default function Page({ posts }){


    const [finalPosts, setParsedPosts] = useState([]);

    
    useEffect(() => {
        import('./effects.css');
        import('./schemes.css');
        import('./sizes.css');
        import('./utils.css');

        const parsedPosts = [];

    // For themes
    const randomStartingValue = Math.random() < 0.5 ? 1 : 2;
    const startingOtherValue = randomStartingValue === 1 ? 2 : 1;
    const randomTrailingValue = Math.random() < 0.5 ? 3 : 4;
    const trailingOtherValue = randomTrailingValue === 3 ? 4 : 3;
    const themes = { 1: 'light-theme-1', 2: 'light-theme-2', 3: 'dark-theme-1', 4: 'dark-theme-2' };
    // For layouts 
    const randomValueChoice = Math.random() < 0.5 ? 1 : 2;
    const otherValueChoice = randomValueChoice === 1 ? 2 : 1;
    const layouts = { 1: 'layout-1', 2: 'layout-2' };
    const findScheme = (type, i) => {
        i++;
        let theme;
        let layout;
        const position = Math.ceil(i / 2);
        if (i % 2) {
            layout = `${type}-${layouts[`${randomValueChoice}`]}`;
            if (position % 2) theme = themes[`${randomStartingValue}`];
            else theme = themes[`${startingOtherValue}`]
        } else {
            layout = `${type}-${layouts[`${otherValueChoice}`]}`;
            if (position % 2) theme = themes[`${randomTrailingValue}`];
            else theme = themes[`${trailingOtherValue}`];
        }
        return { layout, theme }
    }

    const compilePosts = () => {
        for (let i in posts) parsedPosts.push({ ...posts[i], ...findScheme(posts[i].type, i) })
    }
    compilePosts();

    setParsedPosts(parsedPosts);

    }, [posts]);

    if (finalPosts) return (
        <>
            { 
                finalPosts.map(({ type, layout, theme, title, description, link, file }, i) => (
                    type === 'image' ? <Image key={`key-${i}`} layout={layout} theme={theme} title={title} description={description} link={link} file={file} /> :
                    type === 'video' ? <Video key={`key-${i}`} layout={layout} theme={theme} title={title} description={description} link={link} file={file} /> :
                    <Normal key={`key-${i}`} theme={theme} title={title} description={description} link={link} />
                ))
            }
        </>
    )
    else return (
        <>
            <h1>404error</h1>
        </>
    )
}