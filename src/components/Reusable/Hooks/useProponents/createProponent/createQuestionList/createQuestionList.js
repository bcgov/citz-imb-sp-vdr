import {
	BreakListPermissionsInheritance,
	CreateList,
	AddFieldToList,
	GetListDefaultView,
	RemoveListViewAllFields,
	AddListViewField,
	UpdateField,
	CreateView,
} from 'components/ApiCalls';

export const createQuestionList = async (listName) => {
	console.log('createQuestionList state :>> CreateList');
	const questionList = await CreateList({ listName });
	const listGUID = questionList.Id;
	console.log('createQuestionList state :>> AddFieldToList');
	await AddFieldToList({
		listGUID,
		field: [
			{
				FieldTypeKind: 2,
				Title: 'Answer',
			},
			{
				FieldTypeKind: 2,
				Title: 'QuestionID',
			},
			{
				FieldTypeKind: 2,
				Title: 'AnswerStatus',
				DefaultValue: 'Received',
			},
			{
				FieldTypeKind: 2,
				Title: 'Assignee',
				DefaultValue: 'VICO Manager',
			},
			{
				FieldTypeKind: 8,
				Title: 'Withdrawn',
				DefaultValue: '0',
			},
		],
	});
	console.log('createQuestionList state :>> UpdateField');
	await UpdateField({
		listGUID,
		fieldName: 'AnswerStatus',
		field: { Title: 'Answer Status' },
	});
	console.log('createQuestionList state :>> UpdateField');
	await UpdateField({
		listGUID,
		fieldName: 'Title',
		field: { Title: 'Question' },
	});
	console.log('createQuestionList state :>> UpdateField');
	await UpdateField({
		listGUID,
		fieldName: 'Created By',
		field: { Title: 'Submitted By' },
	});
	console.log('createQuestionList state :>> GetListDefaultView');
	const defaultView = await GetListDefaultView({ listGUID });
	const viewGUID = defaultView.Id;
	console.log('createQuestionList state :>> RemoveListViewAllFields');
	await RemoveListViewAllFields({ listGUID, viewGUID });
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({ listGUID, viewGUID, field: 'Question' });
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({ listGUID, viewGUID, field: 'AnswerStatus' });
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({ listGUID, viewGUID, field: 'Submitted By' });
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({ listGUID, viewGUID, field: 'Created' });
	console.log('createQuestionList state :>> CreateView');
	const VICOManagerView = await CreateView({
		listGUID,
		viewName: 'VICO_Manager',
	});

	const managerViewId = VICOManagerView.Id;
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({
		listGUID,
		viewGUID: managerViewId,
		field: 'QuestionID',
	});
	console.log('createQuestionList state :>> AddListViewField');
	await AddListViewField({
		listGUID,
		viewGUID: managerViewId,
		field: 'Assignee',
	});
	console.log('createQuestionList state :>> BreakListPermissionsInheritance');
	await BreakListPermissionsInheritance({
		listGUID,
		copy: false,
		clear: true,
	});
};
