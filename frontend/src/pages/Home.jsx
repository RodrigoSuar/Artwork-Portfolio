import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import artworkService from "../services/artwork"
import ArtworkCard from "../components/ArtworkCard"
import './Home.css'

const LIMIT = 20

const Home = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["artworks-home"],
        queryFn: ({ pageParam }) => artworkService.getAll(pageParam, LIMIT),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce((sum, p) => sum + p.artworks.length, 0)
            return loaded < lastPage.total ? allPages.length + 1 : undefined
        },
    })

    const sentinelRef = useRef(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { rootMargin: "400px" }
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const artworks = data?.pages.flatMap((p) => p.artworks) || []

    return (
        <div>
            <div className="hero">
                <span className="hero-eyebrow">Original Works &middot; Studio Collection</span>
                <h1>Welcome to My Art Portfolio</h1>
                <p>Explore a curated collection of contemporary artwork and creative expressions</p>
                <div className="hero-cta">
                    <Link to="/Gallery">
                        <button>View Gallery</button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="home-grid-status">
                    <p>Loading artworks...</p>
                </div>
            ) : isError ? (
                <div className="home-grid-status">
                    <p>Failed to load artworks</p>
                </div>
            ) : artworks.length === 0 ? (
                <div className="home-grid-status">
                    <p>No artworks available yet</p>
                </div>
            ) : (
                <div className="home-grid">
                    {artworks.map((art) => (
                        <ArtworkCard key={art.id} artwork={art} variant="grid" />
                    ))}
                </div>
            )}

            <div ref={sentinelRef} />
        </div>
    )
}

export default Home
