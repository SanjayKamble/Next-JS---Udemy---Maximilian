import Image from 'next/image';
// optimized image for lazy loading, reduced in size and different device compatibility
import classes from './hero.module.css';

function Hero() {
    return <section className={classes.hero}>
        <div className={classes.image}>
            <Image src="/images/site/coder.jpg" alt="Image showing Sanjay" width={300} height={300} />
        </div>
        <h1> Hi,Im Sanjay </h1>
        <p>I blog about web developement
            - especially about front-end technologies like
            Tailwind, Javascript, React and NextJS</p>
    </section>
} export default Hero;