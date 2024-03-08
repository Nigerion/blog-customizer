import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentAricleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentAricleState.fontFamilyOption.value,
					'--font-size': currentAricleState.fontSizeOption.value,
					'--font-color': currentAricleState.fontColor.value,
					'--container-width': currentAricleState.contentWidth.value,
					'--bg-color': currentAricleState.backgroundColor.value,
				} as CSSProperties
			}>
			{/* форма */}
			<ArticleParamsForm
				currentAricleState={currentAricleState}
				setCurrentArticleState={setCurrentArticleState}
			/>
			{/* СТАТЬЯ */}
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
