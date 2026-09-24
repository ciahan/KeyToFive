import Header from "../components/Header";

export default function Contact() {
    return (
        <>
            <Header />
            <div className="page">
                <div className="h0">
                    Contact Us!
                </div>
                <h2>
                    <span> Send us a mesage at </span> 
                    <span className="highlight-text"> keytofive@gmail.com</span>
                    <span>. We look forward to hearing from you!</span>
                </h2>
            </div>
        </>
    )
}