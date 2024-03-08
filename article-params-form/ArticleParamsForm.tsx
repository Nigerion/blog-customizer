import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group/RadioGroup';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select/Select';
import { Text } from '../text/Text';

type ArticleParamsFormProps = {
	currentAricleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentAricleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newFontColor, setNewFontColor] = useState(
		currentAricleState.fontColor
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState(
		currentAricleState.backgroundColor
	);
	const [newFontFamilyOptions, setNewFontFamilyOptions] = useState(
		currentAricleState.fontFamilyOption
	);
	const [newContentWidthArr, setNewContentWidthArr] = useState(
		currentAricleState.contentWidth
	);
	const [newFontSizeOptions, setNewFontSizeOptions] = useState(
		currentAricleState.fontSizeOption
	);
	const formOpenHandler = () => {
		setIsOpen(!isOpen);
	};
	//для обновления настроик
	const formSumbitHandler = (event: SyntheticEvent) => {
		event.preventDefault();
		setCurrentArticleState({
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			fontFamilyOption: newFontFamilyOptions,
			contentWidth: newContentWidthArr,
			fontSizeOption: newFontSizeOptions,
		});
	};
	// для сброса  настроик
	const handleResetForm = (event: SyntheticEvent) => {
		event.preventDefault();
		setNewFontFamilyOptions(fontFamilyOptions[0]);
		setNewFontSizeOptions(defaultArticleState.fontSizeOption);
		setNewFontColor(fontColors[0]);
		setNewBackgroundColor(backgroundColors[0]);
		setNewContentWidthArr(contentWidthArr[0]);
	};
	//  для закрытия формы на овердей
	const modalRef = useRef<any>();
	const closeModal = (e: MouseEvent) => {
		if (
			isOpen &&
			modalRef.current &&
			!modalRef.current.contains(e.target) &&
			formOpenHandler
		) {
			formOpenHandler();
		}
	};
	useEffect(() => {
		document.body.addEventListener('mousedown', closeModal);
		return () => {
			document.body.removeEventListener('mousedown', closeModal);
		};
	});

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpen} />
			<aside
				ref={modalRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form onSubmit={formSumbitHandler} className={clsx(styles.form)}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamilyOptions}
						title='шрифт'
						onChange={setNewFontFamilyOptions}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={newFontSizeOptions}
						title='размер шрифта'
						onChange={setNewFontSizeOptions}
					/>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newBackgroundColor}
						title='цвет фона'
						onChange={setNewBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={newContentWidthArr}
						title='Ширина контента'
						onChange={setNewContentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
