// file to add general structure the project and to make use of portal
// to add attribute  to html element
//add extra(entry points) elements to add with react portal

import Document ,{Html,Head,Main,NextScript} from "next/document";

class MyDocument extends Document {
    render(){
        return (
            <Html lang="en">
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                    <div id="notifications"></div>
                </body>
            </Html>
        )
    }
}
export default MyDocument;