import { TMDB_BASE_IMAGE_URL, TMDB_BASE_BACKDROP_URL } from "./APIUtils";
function sampleMovies() {
	return {
		movies: [
			{
				id: 1,
				title: "Venom: The Last Dance",
				description:
					"Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
				durationInMinutes: 120,
				releaseDate: "2024-10-22",
				posterurl: `${TMDB_BASE_IMAGE_URL}/aosm8NMQ3UyoBVpSxyimorCQykC.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg`,
				theaters: [
					{
						id: 1,
						name: "Theater 1",
						movie: 1,
						showtimes: [
							{ id: 1, dateTime: "2024-11-23T13:00:00" },
							{ id: 2, dateTime: "2024-11-23T16:00:00" },
							{ id: 3, dateTime: "2024-11-23T19:00:00" },
							{ id: 4, dateTime: "2024-11-23T21:00:00" },
						],
					},
				],
			},
			{
				id: 2,
				title: "Smile 2",
				description:
					"About to embark on a new world tour, global pop sensation Skye Riley begins experiencing increasingly terrifying and inexplicable events. Overwhelmed by the escalating horrors and the pressures of fame, Skye is forced to face her dark past to regain control.",
				durationInMinutes: 142,
				releaseDate: "2024-10-16",
				posterurl: `${TMDB_BASE_IMAGE_URL}/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/iR79ciqhtaZ9BE7YFA1HpCHQgX4.jpg`,
				theaters: [
					{
						id: 2,
						name: "Theater 2",
						movie: 2,
						showtimes: [
							{ id: 5, dateTime: "2024-11-23T14:00:00" },
							{ id: 6, dateTime: "2024-11-23T17:00:00" },
							{ id: 7, dateTime: "2024-11-23T20:00:00" },
						],
					},
				],
			},
			{
				id: 3,
				title: "The Wild Robot",
				description:
					"After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
				durationInMinutes: 175,
				releaseDate: "2024-09-12",
				posterurl: `${TMDB_BASE_IMAGE_URL}/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg`,
				theaters: [
					{
						id: 3,
						name: "Theater 3",
						movie: 3,
						showtimes: [
							{ id: 8, dateTime: "2024-11-23T15:00:00" },
							{ id: 9, dateTime: "2024-11-23T18:00:00" },
							{ id: 10, dateTime: "2024-11-23T21:00:00" },
						],
					},
				],
			},
			{
				id: 4,
				title: "Terrifier 3",
				description:
					"Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives. As the holiday season approaches, they try to embrace the Christmas spirit and leave the horrors of the past behind.",
				durationInMinutes: 152,
				releaseDate: "2024-09-12",
				posterurl: `${TMDB_BASE_IMAGE_URL}/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg`,
				theaters: [
					{
						id: 4,
						name: "Theater 4",
						movie: 4,
						showtimes: [
							{ id: 11, dateTime: "2024-11-23T12:00:00" },
							{ id: 12, dateTime: "2024-11-23T15:00:00" },
							{ id: 13, dateTime: "2024-11-23T18:00:00" },
							{ id: 14, dateTime: "2024-11-23T21:00:00" },
						],
					},
				],
			},
			{
				id: 5,
				title: "Gladiator II",
				description:
					"'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.",
				durationInMinutes: 154,
				releaseDate: "2024-11-13",
				posterurl: `${TMDB_BASE_IMAGE_URL}/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg`,
				theaters: [
					{
						id: 5,
						name: "Theater 5",
						movie: 5,
						showtimes: [
							{ id: 15, dateTime: "2024-11-23T13:00:00" },
							{ id: 16, dateTime: "2024-11-23T16:00:00" },
							{ id: 17, dateTime: "2024-11-23T19:00:00" },
							{ id: 18, dateTime: "2024-11-23T22:00:00" },
						],
					},
				],
			},
			{
				id: 6,
				title: "Levels",
				description:
					"After witnessing his girlfriend's murder, a man risks everything - including reality itself - to discover the truth.",
				durationInMinutes: 195,
				posterurl: `${TMDB_BASE_IMAGE_URL}/yq39ChrCDlqrurYuaC8WM0vC1cx.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/kwXycPsLA6SV3KUOagn343TtMOf.jpg`,
				releaseDate: "1993-12-15",
				theaters: [
					{
						id: 6,
						name: "Theater 6",
						movie: 6,
						showtimes: [
							{ id: 19, dateTime: "2024-11-23T14:00:00" },
							{ id: 20, dateTime: "2024-11-23T17:00:00" },
							{ id: 21, dateTime: "2024-11-23T20:00:00" },
						],
					},
				],
			},
			{
				id: 7,
				title: "Wicked",
				description:
					"Elphaba, a young woman misunderstood because of her green skin, and Glinda, a popular aristocrat gilded by privilege, become unlikely friends in the fantastical Land of Oz. As the two women struggle with their opposing personalities, their friendship is tested.",
				durationInMinutes: 148,
				posterurl: `${TMDB_BASE_IMAGE_URL}/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/uVlUu174iiKhsUGqnOSy46eIIMU.jpg`,
				releaseDate: "2024-11-20",
				theaters: [
					{
						id: 7,
						name: "Theater 7",
						movie: 7,
						showtimes: [
							{ id: 22, dateTime: "2024-11-23T13:00:00" },
							{ id: 23, dateTime: "2024-11-23T16:00:00" },
							{ id: 24, dateTime: "2024-11-23T19:00:00" },
							{ id: 25, dateTime: "2024-11-23T22:00:00" },
						],
					},
				],
			},
			{
				id: 8,
				title: "The Substance",
				description:
					"A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
				durationInMinutes: 139,
				releaseDate: "2024-09-07",
				posterurl: `${TMDB_BASE_IMAGE_URL}/lqoMzCcZYEFK729d6qzt349fB4o.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg`,
				theaters: [
					{
						id: 8,
						name: "Theater 8",
						movie: 8,
						showtimes: [
							{ id: 26, dateTime: "2024-11-23T14:00:00" },
							{ id: 27, dateTime: "2024-11-23T17:00:00" },
							{ id: 28, dateTime: "2024-11-23T20:00:00" },
						],
					},
				],
			},
			{
				id: 9,
				title: "Moana 2",
				description:
					"After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
				durationInMinutes: 142,
				releaseDate: "2024-11-27",
				posterurl: `${TMDB_BASE_IMAGE_URL}/m0SbwFNCa9epW1X60deLqTHiP7x.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg`,
				theaters: [
					{
						id: 9,
						name: "Theater 9",
						movie: 9,
						showtimes: [
							{ id: 29, dateTime: "2024-11-23T13:00:00" },
							{ id: 30, dateTime: "2024-11-23T16:00:00" },
							{ id: 31, dateTime: "2024-11-23T19:00:00" },
							{ id: 32, dateTime: "2024-11-23T22:00:00" },
						],
					},
				],
			},
			{
				id: 10,
				title: "Transformers One",
				description:
					"The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever.",
				durationInMinutes: 136,
				releaseDate: "2024-09-11",
				posterurl: `${TMDB_BASE_IMAGE_URL}/qbkAqmmEIZfrCO8ZQAuIuVMlWoV.jpg`,
				backdropurl: `${TMDB_BASE_BACKDROP_URL}/uMXVeVL2v57lMv6pqBmegDHHPqz.jpg`,
				theaters: [
					{
						id: 10,
						name: "Theater 10",
						movie: 10,
						showtimes: [
							{ id: 33, dateTime: "2024-11-23T12:00:00" },
							{ id: 34, dateTime: "2024-11-23T15:00:00" },
							{ id: 35, dateTime: "2024-11-23T18:00:00" },
							{ id: 36, dateTime: "2024-11-23T21:00:00" },
						],
					},
				],
			},
		],
	};
}
export default sampleMovies;
