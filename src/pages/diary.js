/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDiaryList } from "../services/diary";

export default function DiaryList() {
  const [diaryList, setDiaryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchDiaryList();
      setDiaryList(data.list);
      setLoading(false);
    })();
  }, []);
  return loading ? (
    <h1>로딩</h1>
  ) : (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Jua:400&display=optional' rel='stylesheet' />
      </Head>
      <nav>
        <ul>
          {diaryList.map((diary) => (
            <li className='diary-box' key={diary.path}>
              <Link href={`/diary/${diary.path}`}>
                <a>{diary.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
      nav {
        line-height: 1.9;
        font-family: "Jua", sans-serif;
      }

      ul {
        padding: 1rem 1.5rem;
        gap: 1.3rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      
      li {
        border-radius: 10px;
        transition: all 0.4s;
      }

      li:hover {
        color: #4747ff;
      }

      a {
        display: inline-block;
        text-align: center;
        width: 100%;
        padding: 1.8rem 1.5rem;
        font-size: 1.2rem;
      }

      @media (max-width: 800px) {
        ul {
          grid-template-columns: 1fr 1fr;
        }
      }
      
      @media (max-width: 559px) {
        ul {
          grid-template-columns: 1fr;
        }
    `}</style>
    </>
  );
}
