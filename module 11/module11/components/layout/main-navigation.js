
//Link automatically prefetches data and is used for SPA 
import Link from 'next/link';
import classes from './main-navigation.module.css';
import Logo from './logo';

//navbar
function MainNavigation() {
    return <header className={classes.header}>
        {/* when clicked on logo go back to homepage */}
        <Link href="/">
            {/* Link tag will provide link only to plain text so 
            in any other scenario, use <a> anchor tag(eg. if any component or other html content is there) */}
            <a>
                <Logo />
            </a>
        </Link>


        <nav>
            <ul>
                <li>
                    <Link href="/posts">All Posts</Link>

                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    </header>
} export default MainNavigation;