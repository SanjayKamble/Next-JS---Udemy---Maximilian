//using api routes for pre rendering pages
import { useState } from 'react';
import { Fragment } from 'react';
import { buildFeedbackFilePath, readFileData } from '../pages/api/feedback'
function FeedbackPage(props) {
    const [feedbackItemData, setFeedbackItemData] = useState();

    function findDetail(id) {
       
        fetch('/api/'+ id)
        .then(response => response.json()
        .then(data => 
            setFeedbackItemData(data.feedback)))
    }
    return (

        <Fragment>
            {feedbackItemData && <p>{feedbackItemData.email}</p>}

        <ul>
            {props.feedbackItems.map((items) =>
                <li key={items.id}>{items.text}{' '}<button onClick={findDetail.bind(null, items.id)}>find detail</button></li>)}

                

        </ul>
        </Fragment>
    )
}


export async function getStaticProps() {

    const filePath = buildFeedbackFilePath();
    const data = readFileData(filePath);

    return {
        props: {
            feedbackItems: data
        }

    }
}
export default FeedbackPage;

