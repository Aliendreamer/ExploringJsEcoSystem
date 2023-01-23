const listOnlyFolders = (library) => {

	try {
		const result = require("./data.json");//  await this.listVodLibraryEntries(library, true);

		// Get all the entries for the library.
		const entries = Object.values(result.entries);
		// Find the rootId which is the base folder.
		const rootDirectoryId = result.root;
		// Grab the starting parent folder by its id
		const rootFolder = entries.find(entry => entry.prog_info.id === rootDirectoryId);
		// Get all the info for the relations inside the vod library
		const child_relations = result.child_relations;
		// Get all Folders directly under the main folder
		const folderEntries = entries.filter(entry => entry.prog_info.type === 9 && entry.prog_info.id !== rootDirectoryId);

		// edge case empty configuration is it possible on prod? an empty folder? how we should handle it?
		if (child_relations.length === 0) {
			const folderResult = rootFolder;
			return [folderResult];
		}

		// Filter folders which are not under the main folder are children of direct children of the main folder
		const rootFolderChildrenIds = child_relations[rootDirectoryId].map(child => child.child_id);
		const rootFolderChildren = folderEntries.filter(folder => rootFolderChildrenIds.some(id => id === folder.prog_info.id));

		// iterate over the folders under the main one
		const folders = [];
		for (const folder of rootFolderChildren) {
			const childFolders = [];
			// Get all the nested folder relationships.
			const folderChildRelations = child_relations[folder.prog_info.id];

			// We can have folder without relationships as it is like a file system
			if (folderChildRelations.length === 0) {
				const emptyFolder = folder;
				folders.push(emptyFolder);
				continue;
			}

			// Go over all the folder relationships and get the movies in it
			for (const folderChild of folderChildRelations) {
				// Get it from entries first we need to string it as the key is string
				const child = result.entries[folderChild.child_id];

				// If we have a folder inside the folder which content we iterate we grab its contents too.
				if (child.prog_info.type == 9) {
					const childFolder = createOnlyFolderStructure(child, child_relations, result);
					childFolders.push(childFolder);
				}
			}
			// Filtering the same folders as we can have same folder for different languages
			const distinctFolders = childFolders;
			const folderInfo = { ...folder, folders: distinctFolders, movies: [] };

			folders.push(folderInfo);
		}
		const distinctFolders = folders;
		return distinctFolders;
	} catch (error) {
		return [];
	}
}

const createOnlyFolderStructure = (folder, child_relations, libraryInfo) => {
	const folders = [];
	// Get all the nested folder relationships.
	const folderChildRelations = child_relations[folder.prog_info.id];

	// We can have folder without relationships as it is like a file system
	if (!folderChildRelations) {
		const emptyFolder = folder;
		return emptyFolder;
	}
	// Go over all the folder relationships and get the movies in it
	for (const folderChild of folderChildRelations) {
		// Get it from entries first we need to string it as the key is string
		const child = libraryInfo.entries[folderChild.child_id];
		// We can have a nested folders in the main folder structure so we need the recursion
		// this can be a problem if it goes too deep, for example if this child folder has child folder and
		// it too has child folder and so on, can be a problem but I have no clear way to know how deep it can be.
		if (child.prog_info.type == 9) {
			const childFolder = createOnlyFolderStructure(child, child_relations, libraryInfo);
			folders.push(childFolder);
			continue;
		}
	}
	// Filtering the same folders as we can have same folder for different languages same as movies better here than later
	const distinctFolders = folders;
	const folderObj = { ...folder, folders: distinctFolders };
	return folderObj;
}


const createFolderStructure = async (folderId, child_relations, entries, libraryId) => {
	// we create dynamic keys here because we can have multiple libraries we can't have 1 key for them.


	const folders = [];
	const movies = [];
	// Get all the nested folder relationships.
	const folderInfo = entries[folderId];
	const folderChildRelations = child_relations[folderId];

	// We can have folder without relationships as it is like a file system
	if (folderChildRelations) {
		const emptyFolder = await Transformer.getTransformer().getVodFolder(folderInfo);
		return emptyFolder;
	}
	// Go over all the folder relationships and get the movies in it
	for (const folderChild of folderChildRelations) {
		// Get it from entries first we need to string it as the key is string
		const child = entries[folderChild.child_id];
		// We can have a nested folders in the main folder structure so we need the recursion
		// this can be a problem if it goes too deep, for example if this child folder has child folder and
		// it too has child folder and so on, can be a problem but I have no clear way to know how deep it can be.
		if (child.prog_info.type == 9) {
			const childFolder = createFolderStructure(child.prog_info.id, child_relations, entries, libraryId);
			folders.push(childFolder);
			continue;
		}
		// We are interested if it is movie boxset series or episode

	}
	return { ...folderInfo, folders };
}

listOnlyFolders()