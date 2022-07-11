//we have to pre-render this page ,
// we will use static generation because this page should be understood by search engine

import {getFeaturedEvents} from '../helpers/api.utils'
import EventList from '../components/events/event-list';

function HomePage(props){
   
   
    return (
        <div>
          <EventList items = {props.events}/>
        </div>
    )
}

export async function getStaticProps(){

  const featuredEvents = await getFeaturedEvents(); 
  return {
    props :{
      events :featuredEvents// this should be fetched from firebase
    },
    revalidate : 1800
  }
}

export default HomePage;