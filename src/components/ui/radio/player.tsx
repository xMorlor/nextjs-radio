"use client";

import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { ChevronRight, ChevronLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

interface Song {
	id: number;
	readable: boolean;
	title: string;
	title_short: string;
	title_version: string;
	link: string;
	duration: number;
	rank: number;
	explicit_lyrics: boolean;
	explicit_content_lyrics: number;
	explicit_content_cover: number;
	preview: string;
	md5_image: string;
	artist: Artist;
	album: Album;
	type: string;
}

interface Artist {
	id: number;
	name: string;
	link: string;
	picture: string;
	picture_small: string;
	picture_medium: string;
	picture_big: string;
	picture_xl: string;
	tracklist: string;
	type: string;
}

interface Album {
	id: number;
	title: string;
	cover: string;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	md5_image: string;
	tracklist: string;
	type: string;
}

export default function Player({ songs }: { songs: Song[] }) {
	const [songName, setSongName] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [songIndex, setSongIndex] = useState(0);

	const [progress, setProgress] = useState(0);

	const [audioIsPlaying, setAudioIsPlaying] = useState(false);

	const audio = useRef<HTMLAudioElement>(null);

	const slider = useRef<HTMLSpanElement>(null);

	const pauseOrPlaySong = () => {
		audioIsPlaying ? audio.current?.pause() : audio.current?.play();
		setAudioIsPlaying(!audioIsPlaying);
	};

	const playPreviousSong = () => {
		if (songIndex > 0) {
			setSongName(songs[songIndex - 1].title);
			setAuthorName(songs[songIndex - 1].artist.name);
			setCoverImage(songs[songIndex - 1].album.cover_medium);

			if (audio.current) {
				audio.current.src = songs[songIndex - 1].preview;

				audio.current.load();
			}

			setSongIndex((prevValue) => prevValue - 1);
		} else {
			setSongName(songs[songs.length - 1].title);
			setAuthorName(songs[songs.length - 1].artist.name);
			setCoverImage(songs[songs.length - 1].album.cover_medium);

			if (audio.current) {
				audio.current.src = songs[songs.length - 1].preview;

				audio.current.load();
			}

			setSongIndex(songs.length - 1);
		}
	};

	const playNextSong = () => {
		if (songIndex === songs.length - 1) {
			setSongIndex(0);
			setSongName(songs[0].title);
			setAuthorName(songs[0].artist.name);
			setCoverImage(songs[0].album.cover_medium);

			if (audio.current) {
				audio.current.src = songs[0].preview;

				audio.current.load();
			}
		} else {
			setSongName(songs[songIndex + 1].title);
			setAuthorName(songs[songIndex + 1].artist.name);
			setCoverImage(songs[songIndex + 1].album.cover_medium);

			if (audio.current) {
				audio.current.src = songs[songIndex + 1].preview;

				audio.current.load();
			}

			setSongIndex((prevValue) => prevValue + 1);
		}
	};

	const adjustVolume = (e: any) => {
		if (audio.current) {
			audio.current.volume = e[0] / 100;
		}
	};

	useEffect(() => {
		setSongName(songs[songIndex].title);
		setAuthorName(songs[songIndex].artist.name);
		setCoverImage(songs[songIndex].album.cover_medium);

		if (audio.current) {
			audio.current.src = songs[songIndex].preview;

			audio.current.load();

			audio.current.addEventListener("loadeddata", () => {
				setAudioIsPlaying(true);
				audio.current?.play();
			});

			audio.current.addEventListener("ended", () => {
				playNextSong();
			});

			audio.current.addEventListener("timeupdate", () => {
				const duration = audio.current?.duration || 0;
				const currentTime = audio.current?.currentTime || 0;
				const progressPercent = (currentTime / duration) * 100;

				setProgress(progressPercent);
			});
		}

		return () => {
			if (audio.current) {
				audio.current.removeEventListener("loadeddata", () => {});
				audio.current.removeEventListener("ended", () => {});
				audio.current.removeEventListener("timeupdate", () => {});
			}
		};
	}, [songIndex]);

	return (
		<Card className="w-[50%]">
			<CardContent className="flex items-center justify-center gap-6 mb-3">
				<div className="w-[45%]">
					<img src={coverImage} className="mt-7 rounded-md" />
				</div>

				<div className="flex flex-col items-center justify-center mt-20">
					<CardTitle>{songName}</CardTitle>
					<CardHeader>{authorName}</CardHeader>
				</div>

				<audio ref={audio}></audio>
			</CardContent>

			<CardFooter>
				<div className="w-[25%]">{/* gap */}</div>

				<div className="w-[50%] flex items-center justify-center gap-6">
					<Button
						variant="outline"
						size="icon"
						onClick={playPreviousSong}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						onClick={pauseOrPlaySong}
						type="button"
					>
						{audioIsPlaying ? (
							<Pause className="h-4 w-4" />
						) : (
							<Play className="h-4 w-4" />
						)}
					</Button>

					<Button
						variant="outline"
						size="icon"
						onClick={playNextSong}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				<Slider
					min={0}
					max={100}
					defaultValue={[100]}
					step={2}
					onValueChange={(e) => {
						adjustVolume(e);
					}}
					ref={slider}
					className="w-[25%]"
				/>
			</CardFooter>

			<div className="w-[100%] flex items-center justify-center mb-7">
				<Progress value={progress} className="w-[55%]" />
			</div>
		</Card>
	);
}
