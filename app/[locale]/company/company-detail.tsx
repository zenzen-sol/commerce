"use client";
import AlisaImage from "@images/company-images/sb_profile_photo_alisa.webp";
import IrieImage from "@images/company-images/sb_profile_photo_irie.webp";
import KarakiImage from "@images/company-images/sb_profile_photo_karaki.webp";
import SundbergImage from "@images/company-images/sb_profile_photo_kou.webp";
import MasaImage from "@images/company-images/sb_profile_photo_masa.webp";
import NishikawaImage from "@images/company-images/sb_profile_photo_nishikawa.webp";
import SaitoImage from "@images/company-images/sb_profile_photo_saito.webp";
import ShinyaImage from "@images/company-images/sb_profile_photo_shinya.webp";
import TakaImage from "@images/company-images/sb_profile_photo_taka.webp";

import clsx from "clsx";
import VideoPlayer from "components/video/video-player";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CompanyDetail() {
	const t = useTranslations("Index");
	const [hasWindow, setHasWindow] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);

	return (
		<div className="w-full px-6">
			<div
				className={clsx(
					"mx-auto flex w-full flex-col space-y-24",
					"py-12 font-serif md:py-24",
					"mx-auto max-w-4xl",
				)}
			>
				<h2 className="font-multilingual mx-auto max-w-sm text-center text-4xl md:text-4xl">
					{t("company.title")}
				</h2>

				<div>
					<h3 className="text-2xl">{t("company.subtitle001")}</h3>
					<ul className="font-multilingual flex flex-col space-y-4 py-4 text-base font-extralight">
						<li className="border-t border-white/20 py-4">
							<div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
								<div className="w-1/3">{t("company.name.label")}</div>
								<div className="grow">{t("company.name.value")}</div>
							</div>
						</li>
						<li className="border-t border-white/20 py-4">
							<div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
								<div className="w-1/3">{t("company.director.label")}</div>
								<div className="grow">{t("company.director.value")}</div>
							</div>
						</li>
						<li className="border-t border-white/20 py-4">
							<div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
								<div className="w-1/3">{t("company.since.label")}</div>
								<div className="grow">{t("company.since.value")}</div>
							</div>
						</li>
						<li className="border-t border-white/20 py-4">
							<div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
								<div className="w-1/3">{t("company.address.label")}</div>
								<div className="grow">{t("company.address.value")}</div>
							</div>
						</li>
						<li className="border-t border-white/20 py-4">
							<div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
								<div className="w-1/3">{t("company.telephone.label")}</div>
								<div className="grow">{t("company.telephone.value")}</div>
							</div>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="pb-4 text-2xl">{t("company.subtitle002")}</h3>
					<div className="grid grid-cols-1 gap-4 border-t border-white/20 md:grid-cols-3">
						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={IrieImage}
									priority={true}
									alt="A picture of Irie Masayuki."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.irie.japanese")}
							</div>
							<div className="pb-4">{t("company.irie.english")}</div>
							<div className="text-sm">{t("company.irie.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={NishikawaImage}
									priority={true}
									alt="A picture of Masataka Nishikawa."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.nishikawa.japanese")}
							</div>
							<div className="pb-4">{t("company.nishikawa.english")}</div>
							<div className="text-sm">{t("company.nishikawa.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={SundbergImage}
									priority={true}
									alt="A picture of Kou Sundberg."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.sundberg.japanese")}
							</div>
							<div className="pb-4">{t("company.sundberg.english")}</div>
							<div className="text-sm">{t("company.sundberg.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={MasaImage}
									priority={true}
									alt="A picture of Masanori Komatsu."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.masa.japanese")}
							</div>
							<div className="pb-4">{t("company.masa.english")}</div>
							<div className="text-sm">{t("company.masa.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={TakaImage}
									priority={true}
									alt="A picture of Takatoshi Yamano."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.yamano.japanese")}
							</div>
							<div className="pb-4">{t("company.yamano.english")}</div>
							<div className="text-sm">{t("company.yamano.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={AlisaImage}
									priority={true}
									alt="A picture of Alisa Yoshida."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.yoshida.japanese")}
							</div>
							<div className="pb-4">{t("company.yoshida.english")}</div>
							<div className="text-sm">{t("company.yoshida.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={ShinyaImage}
									priority={true}
									alt="A picture of Shinya Ikegaya."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.ikegaya.japanese")}
							</div>
							<div className="pb-4">{t("company.ikegaya.english")}</div>
							<div className="text-sm">{t("company.ikegaya.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={SaitoImage}
									priority={true}
									alt="A picture of Toshiyuki Saito."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.saito.japanese")}
							</div>
							<div className="pb-4">{t("company.saito.english")}</div>
							<div className="text-sm">{t("company.saito.role")}</div>
						</div>

						<div className="font-multilingual col-span-1 py-4 text-base font-extralight">
							<div className="relative aspect-square">
								<Image
									src={KarakiImage}
									priority={true}
									alt="A picture of Haruna Karaki."
									className={clsx("h-full w-full object-cover")}
								/>
							</div>
							<div className="pt-2 font-japan font-extralight">
								{t("company.karaki.japanese")}
							</div>
							<div className="pb-4">{t("company.karaki.english")}</div>
							<div className="text-sm">{t("company.karaki.role")}</div>
						</div>
					</div>
				</div>

				<div>
					<h3 className="pb-4 text-2xl">{t("company.subtitle003")}</h3>
					<div className="border-t border-white/20 pb-4" />
					<div className=" bg-white/10 text-white">
						{hasWindow && (
							<VideoPlayer
								url="https://player.vimeo.com/video/617871561?h=eefc1fe226"
								// playing={isPlayingVideo}
								autoplay={false}
								loop={false}
								controls={true}
								volume={0.5}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
