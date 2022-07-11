import Head from 'next/dist/shared/lib/head';
import ContactForm from '../components/contact/contact-form';

function ContactPage(){
return <>
<Head>
    <title>
        Contacts page
    </title>
    <meta name='description' content='This is Contact page for users'></meta>
</Head>
<ContactForm/>
</>

}export default ContactPage;
