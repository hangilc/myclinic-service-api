"use strict";

require("setimmediate");
var conti = require("conti");

var timeout = 15000;

function request(service, data, method, cb){
	data = data || {};
	method = method || "GET";
	var url = window.location.origin + "/service";
	var searchParams = new URLSearchParams();
	searchParams.append("_q", service);
	var opt = {
		method: method,
		headers: {}
	};
	if( method === "GET" ){
		Object.keys(data).forEach(function(key){
			searchParams.append(key, data[key]);
		});
	}
	if( method === "POST" ){
		if( typeof data === "string" ){
			opt.body = data;
		} else {
			opt.body = JSON.stringify(data);
		}
		opt.headers["content-type"] = "application/json";
	}
	var done = false;
	var timer = setTimeout(function(){
		timer = null;
		if( !done ){
			done = true;
			cb("TIMEOUT");
		}
	}, timeout);
	url += "?" + searchParams.toString();
	conti.fetchJson(url, opt, function(err, result){
		if( timer ){
			clearTimeout()
		}
		if( !done ){
			done = true;
			cb(err, result);
		}
	});
}

// function request(service, data, method, cb){
// 	data = data || {};
// 	method = method || "GET";
// 	var config = {
// 		url: "./service?_q=" + service,
//         type: method,
// 		data: data,
// 		dataType: "json",
// 		success: function(list){
// 			cb(undefined, list);
// 		},
// 		error: function(xhr, err, errThrown){
// 			cb("ERROR: " + (xhr.responseText || err || errThrown));
// 		},
// 		timeout: 10000
// 	};
// 	if( method === "POST" && typeof data === "string" ){
// 		config.contentType = "application/json";
// 	}
// 	$.ajax(config);
// }

exports.recentVisits = function(cb){
	request("recent_visits", "", "GET", cb);
};

exports.getPatient = function(patientId, cb){
	request("get_patient", {patient_id: patientId}, "GET", cb);
};

exports.calcVisits = function(patientId, cb){
	request("calc_visits", {patient_id: patientId}, "GET", cb);
};

exports.listFullVisits = function(patientId, offset, n, cb){
	request("list_full_visits", {patient_id: patientId, offset: offset, n: n}, "GET", cb);
};

exports.startExam = function(visitId, done){
	request("start_exam", {visit_id: visitId}, "POST", done);
};

exports.suspendExam = function(visitId, done){
	request("suspend_exam", {visit_id: visitId}, "POST", done);
};

exports.endExam = function(visitId, charge, done){
	request("end_exam", {visit_id: visitId, charge: charge}, "POST", done);
};

exports.listCurrentFullDiseases = function(patientId, cb){
	request("list_current_full_diseases", {patient_id: patientId}, "GET", cb);
};

exports.listFullWqueueForExam = function(cb){
	request("list_full_wqueue_for_exam", {}, "GET", cb);
};

exports.getVisit = function(visitId, cb){
	request("get_visit", {visit_id: +visitId}, "GET", cb);
};

exports.searchPatient = function(text, cb){
	request("search_patient", {text: text}, "GET", cb);
};

exports.listTodaysVisits = function(cb){
	request("list_todays_visits", {}, "GET", cb);
};

exports.startVisit = function(patientId, at, done){
	request("start_visit", {patient_id: patientId, at: at}, "POST", done);
};

exports.deleteVisit = function(visitId, done){
	request("delete_visit", {visit_id: visitId}, "POST", done);
};

exports.getText = function(textId, cb){
	request("get_text", {text_id: textId}, "GET", cb);
};

exports.updateText = function(text, done){
	request("update_text", text, "POST", done);
};

exports.deleteText = function(textId, done){
	request("delete_text", {text_id: textId}, "POST", done);
};

exports.enterText = function(text, cb){
	request("enter_text", text, "POST", cb);
};

exports.listAvailableHoken = function(patientId, at, cb){
	request("list_available_hoken", {patient_id: patientId, at: at}, "GET", cb);
};

exports.updateVisit = function(visit, done){
	request("update_visit", visit, "POST", done);
};

exports.getVisitWithFullHoken = function(visitId, cb){
	request("get_visit_with_full_hoken", {visit_id: visitId}, "GET", cb);
};

exports.searchIyakuhinMaster = function(text, at, cb){
	request("search_iyakuhin_master", {text: text, at: at}, "GET", cb);
};

exports.searchPrescExample = function(text, cb){
	request("search_presc_example", {text: text}, "GET", cb);
};

exports.searchFullDrugForPatient = function(patientId, text, cb){
	request("search_full_drug_for_patient", {patient_id: patientId, text: text}, "GET", cb);
};

exports.resolveIyakuhinMasterAt = function(iyakuhincode, at, cb){
	request("resolve_iyakuhin_master_at", {iyakuhincode: iyakuhincode, at: at}, "GET", cb);
};

exports.getIyakuhinMaster = function(iyakuhincode, at, cb){
	request("get_iyakuhin_master", {iyakuhincode: iyakuhincode, at: at}, "GET", cb);
};

exports.enterDrug = function(drug, cb){
	request("enter_drug", drug, "POST", cb);
};

exports.getFullDrug = function(drugId, at, cb){
	request("get_full_drug", {drug_id: drugId, at: at}, "GET", cb);
};

exports.listFullDrugsForVisit = function(visitId, at, cb){
	request("list_full_drugs_for_visit", {visit_id: visitId, at: at}, "GET", cb);
};

exports.batchEnterDrugs = function(drugs, cb){
	request("batch_enter_drugs", JSON.stringify(drugs), "POST", cb);
};

exports.batchDeleteDrugs = function(drugIds, done){
	request("batch_delete_drugs", JSON.stringify(drugIds), "POST", done);
};

exports.batchUpdateDrugsDays = function(drugIds, days, done){
	var data = {
		drug_ids: drugIds,
		days: days
	};
	request("batch_update_drugs_days", JSON.stringify(data), "POST", done);
};

exports.modifyDrug = function(drug, done){
	request("modify_drug", JSON.stringify(drug), "POST", done);
};

exports.batchResolveShinryouNamesAt = function(names, at, cb){
	var body = JSON.stringify({
		names: names,
		at: at
	});
	request("batch_resolve_shinryou_names_at", body, "POST", cb);
};

exports.batchEnterShinryou = function(shinryouList, cb){
	var body = JSON.stringify(shinryouList);
	request("batch_enter_shinryou", body, "POST", cb);
};

exports.getShinryou = function(shinryouId, cb){
	request("get_shinryou", {shinryou_id: shinryouId}, "GET", cb);
};

exports.getFullShinryou = function(shinryouId, at, cb){
	request("get_full_shinryou", {shinryou_id: shinryouId, at: at}, "GET", cb);
};

exports.listFullShinryouForVisit = function(visitId, at, cb){
	request("list_full_shinryou_for_visit", {visit_id: visitId, at: at}, "GET", cb);
};

exports.batchDeleteShinryou = function(shinryouIds, done){
	request("batch_delete_shinryou", JSON.stringify(shinryouIds), "POST", done);
};

exports.searchShinryouMaster = function(text, at, cb){
	request("search_shinryou_master", {text: text, at: at}, "GET", cb);
};

exports.resolveShinryouMasterAt = function(shinryoucode, at, cb){
	request("resolve_shinryou_master_at", {shinryoucode: shinryoucode, at: at}, "GET", cb);
};

exports.getShinryouMaster = function(shinryoucode, at, cb){
	request("get_shinryou_master", {shinryoucode: shinryoucode, at: at}, "GET", cb);
};

exports.enterConduct = function(conduct, cb){
	request("enter_conduct", JSON.stringify(conduct), "POST", cb);
};

exports.enterGazouLabel = function(gazouLabel, done){
	request("enter_gazou_label", JSON.stringify(gazouLabel), "POST", done);
};

exports.enterConductDrug = function(conductDrug, cb){
	request("enter_conduct_drug", JSON.stringify(conductDrug), "POST", cb);
};

exports.enterConductKizai = function(conductKizai, cb){
	request("enter_conduct_kizai", JSON.stringify(conductKizai), "POST", cb);
};

exports.resolveKizaiNameAt = function(name, at, cb){
	var data = {
		name: name,
		at: at
	};
	request("resolve_kizai_name_at", data, "GET", cb);
};

exports.batchEnterConductShinryou = function(conductShinryouList, cb){
	request("batch_enter_conduct_shinryou", JSON.stringify(conductShinryouList), "POST", cb);
};

exports.getFullConduct = function(conductId, at, cb){
	request("get_full_conduct", {conduct_id: conductId, at: at}, "GET", cb);
};

exports.enterConductShinryou = function(conductShinryou, cb){
	request("enter_conduct_shinryou", JSON.stringify(conductShinryou), "POST", cb);
};

exports.enterConductDrug = function(conductDrug, cb){
	request("enter_conduct_drug", JSON.stringify(conductDrug), "POST", cb);
};

exports.copyConducts = function(srcVisitId, dstVisitId, cb){
	request("copy_conducts", {src_visit_id: srcVisitId, dst_visit_id: dstVisitId}, "POST", cb);
};

exports.deleteConduct = function(conductId, done){
	request("delete_conduct", {conduct_id: conductId}, "POST", done);
};

exports.deleteConductShinryou = function(conductShinryouId, done){
	request("delete_conduct_shinryou", {conduct_shinryou_id: conductShinryouId}, "POST", done);
}

exports.deleteConductDrug = function(conductDrugId, done){
	request("delete_conduct_drug", {conduct_drug_id: conductDrugId}, "POST", done);
}

exports.deleteConductKizai = function(conductKizaiId, done){
	request("delete_conduct_kizai", {conduct_kizai_id: conductKizaiId}, "POST", done);
}

exports.getKizaiMaster = function(kizaicode, at, cb){
	request("get_kizai_master", {kizaicode: kizaicode, at: at}, "GET", cb);
};

exports.searchKizaiMaster = function(text, at, cb){
	request("search_kizai_master", {text: text, at: at}, "GET", cb);
};

exports.changeConductKind = function(conductId, kind, done){
	request("change_conduct_kind", {conduct_id: conductId, kind: kind}, "POST", done);
};

exports.setGazouLabel = function(conductId, label, done){
	request("set_gazou_label", {conduct_id: conductId, label: label}, "POST", done);
};

exports.enterShinryouByNames = function(visitId, names, cb){
	var data = {
		visit_id: visitId,
		names: names
	};
	request("enter_shinryou_by_names", JSON.stringify(data), "POST", cb);
};

exports.calcMeisai = function(visitId, cb){
	request("calc_meisai", {visit_id: visitId}, "GET", cb);
};

exports.findCharge = function(visitId, cb){
	request("find_charge", {visit_id: visitId}, "GET", cb);
};

exports.updateCharge = function(charge, done){
	request("update_charge", JSON.stringify(charge), "POST", done);
};

exports.getCharge = function(visitId, cb){
	request("get_charge", {visit_id: visitId}, "GET", cb);
};

exports.searchShoubyoumeiMaster = function(text, at, cb){
	request("search_shoubyoumei_master", {text: text, at: at}, "GET", cb);
};

exports.searchShuushokugoMaster = function(text, cb){
	request("search_shuushokugo_master", {text: text}, "GET", cb);
};

exports.getShoubyoumeiMaster = function(shoubyoumeicode, at, cb){
	request("get_shoubyoumei_master", {shoubyoumeicode: shoubyoumeicode, at: at}, "GET", cb);
};

exports.getShuushokugoMaster = function(shuushokugocode, cb){
	request("get_shuushokugo_master", {shuushokugocode: shuushokugocode}, "GET", cb);
};

exports.getShoubyoumeiMasterByName = function(name, at, cb){
	request("get_shoubyoumei_master_by_name", {name: name, at: at}, "GET", cb);
};

exports.getShuushokugoMasterByName = function(name, cb){
	request("get_shuushokugo_master_by_name", {name: name}, "GET", cb);
};

exports.enterDisease = function(shoubyoumeicode, patientId, startDate, shuushokugocodes, cb){
	var data = {
		shoubyoumeicode: shoubyoumeicode,
		patient_id: patientId,
		start_date: startDate,
		shuushokugocodes: shuushokugocodes
	};
	request("enter_disease", JSON.stringify(data), "POST", cb);
};

exports.getFullDisease = function(diseaseId, cb){
	request("get_full_disease", {disease_id: diseaseId}, "GET", cb);
};

exports.getDisease = function(diseaseId, cb){
	request("get_disease", {disease_id: diseaseId}, "GET", cb);
};

exports.batchUpdateDiseases = function(diseases, done){
	request("batch_update_diseases", JSON.stringify(diseases), "POST", done);
};

exports.listAllFullDiseases = function(patientId, cb){
	request("list_all_full_diseases", {patient_id: patientId}, "GET", cb);
};

exports.updateDiseaseWithAdj = function(disease, done){
	request("update_disease_with_adj", JSON.stringify(disease), "POST", done);
};

exports.deleteDiseaseWithAdj = function(diseaseId, done){
	request("delete_disease_with_adj", {disease_id: diseaseId}, "POST", done);
};

exports.searchTextForPatient = function(patientId, text, cb){
	request("search_text_for_patient", {patient_id: patientId, text: text}, "GET", cb);
};

exports.searchWholeText = function(text, cb){
	request("search_whole_text", {text: text}, "GET", cb);
};

// added for pharma

exports.listFullPharmaQueue = function(cb){
	request("list_full_pharma_queue", {}, "GET", cb);
};

exports.listTodaysVisitsForPharma = function(cb){ 
	request("list_todays_visits_for_pharma", {}, "GET", cb);
};

exports.listDrugs = function(visitId, cb){
	request("list_drugs", {visit_id: visitId}, "GET", cb);
};

exports.listVisits = function(patientId, offset, n, cb){
	request("list_visits", {
		patient_id: patientId,
		offset: offset,
		n: n
	}, "GET", cb);
};

exports.listIyakuhinByPatient = function(patientId, cb){
	request("list_iyakuhin_by_patient", {patient_id: patientId}, "GET", cb);
};

exports.countVisitsByIyakuhincode = function(patientId, iyakuhincode, cb){
	request("count_visits_by_iyakuhincode", {
		patient_id: patientId,
		iyakuhincode: iyakuhincode
	}, "GET", cb);
};

exports.listFullVisitsByIyakuhincode = function(patientId, iyakuhincode, offset, n, cb){
	request("list_full_visits_by_iyakuhincode", {
		patient_id: patientId,
		iyakuhincode: iyakuhincode,
		offset: offset,
		n: n
	}, "GET", cb);
};

exports.findPharmaDrug = function(iyakuhincode, cb){
	request("find_pharma_drug", {
		iyakuhincode: iyakuhincode
	}, "GET", cb);
};

exports.prescDone = function(visitId, done){
	request("presc_done", {
		visit_id: visitId
	}, "POST", done);
};

exports.getDrug = function(drugId, cb){
	request("get_drug", {
		drug_id: drugId
	}, "GET", cb);
};



