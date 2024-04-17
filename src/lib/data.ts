"use server";

import { Track } from "@radix-ui/react-slider";

interface Genre {
	id: number;
	name: string;
	picture: string;
	picture_small: string;
	picture_medium: string;
	picture_big: string;
	picture_xl: string;
	type: string;
}

interface GenreData {
	data: Genre[];
}

export async function fetchGenres(): Promise<string[]> {
	try {
		const response = await fetch("https://api.deezer.com/genre");
		const data: GenreData = await response.json();

		const filteredGenres: Genre[] = data.data.filter(
			(genre) => !genre.name.includes("/") && !genre.name.includes(" ")
		);

		const genreNames: string[] = filteredGenres
			.map((genre) => genre.name)
			.slice(1);

		await new Promise((resolve) => setTimeout(resolve, 3000));

		return genreNames;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Failed to fetch data.");
	}
}

//////////////////////////////////////////////////

interface Radio {
	id: number;
	title: string;
	picture: string;
	picture_small: string;
	picture_medium: string;
	picture_big: string;
	picture_xl: string;
	tracklist: string;
	md5_image: string;
	type: string;
}

interface RadioGenres {
	id: number;
	title: string;
	radios: Array<Radio>;
}

interface RadioData {
	data: RadioGenres[];
}

interface SelectedGenre {
	name: string;
	value: string;
}

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

export async function fetchRadio(
	selectedGenre: SelectedGenre
): Promise<Song[]> {
	try {
		const radios = await fetch("https://api.deezer.com/radio/genres");

		const data: RadioData = await radios.json();

		// filter radios by genre
		const filteredRadios = data.data.find(
			(genre) => genre.title === selectedGenre.value
		)?.radios;

		// select random radio
		const randomRadio: Radio | null = filteredRadios
			? filteredRadios[Math.floor(Math.random() * filteredRadios.length)]
			: null;

		// fetch tracklist
		const tracklist = await fetch(String(randomRadio?.tracklist));

		const tracks = await tracklist.json();

		// filter songs
		const songs = tracks.data.filter((song: Song) => song.type === "track");

		return songs;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Failed to fetch data.");
	}
}

/**
 * GET https://api.deezer.com/radio/genres done
 * -> title == genre done
 * -> radios random select done
 *
 * -> GET tracklist
 *
 * -> GET https://api.deezer.com/radio/37765/tracks
 * -> hrát jen songy ne alba
 * -> link
 * po dohrání písničky random select další z tracklistu
 */
