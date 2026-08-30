import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <div className = "page">
                    {/* INTRO TEXT */}
                    <div className = "main-text">
                        {/* TITLE */}
                        <div className="h0">
                            <span className="highlight-text">Free AP Exam Resources</span>
                            {" "} for {" "}
                            <span className="underline-text">
                            Every Student
                            </span>
                        </div>
                        {/* TEXT */}
                        <h2>
                            Access comprehensive study notes, practice resources, and exam prep materials, all completely free. We believe every student deserves the tools to succeed.
                        </h2>
                        {/* VIEW SUBJECTS BUTTON */}
                        <a
                            className = "buttonMed"
                            href="/subjects"
                        >
                            <h1> View Subjects → </h1>
                        </a>
                    </div>

                    {/* GET INVOLVED */}
                    <div className = "container">
                        <>
                            <h1>
                            Want to Help Other Students?
                            </h1>
                            <h2>
                            This project is built by students, for students. If you have notes you would like to share or want to volunteer your time to help expand our resources, we would love to hear from you.
                            </h2>
                        </>
                        <div className = "flex flex-col gap-4 lg:gap-8 w-full">
                            <div className = "buttonBig">
                                <div className="flex items-center gap-3">
                                    <h1> Share Your Notes </h1>
                                    <div className="linkIcon" />
                                </div>
                                <h22> Have high-quality notes for an AP subject? Share them with fellow students and help them succeed. </h22>
                            </div>
                            <div className = "buttonBig">
                                <div className="flex items-center gap-3">
                                    <h1> Volunteer </h1>
                                    <div className="linkIcon" />
                                </div>
                                <h22> Help us curate resources, review content, or spread the word about free AP resources. </h22>
                            </div>
                        </div>
                        <div className="home2 gap-4 lg:gap-8 w-full">
                            <a
                            className="buttonBig2 flex-1"
                            href="mailto:apnoteshare@gmail.com?subject=I%20want%20to%20contribute"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-5">
                                    <h1> Get in Touch </h1>
                                    <div className="mailIcon" />
                                </div>
                            </a>
                            <a
                            className="buttonBig2 flex-1"
                            href="https://www.instagram.com/keytofive/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-4">
                                    <h1> Follow us on Instagram </h1>
                                    <div className="instaIcon" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
   )
}