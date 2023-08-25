$(document).ready(function () {
    const hash = window.location.hash;
    LoadData(hash);
});

function LoadData(hash) {
    var uid_index = hash.replace('#', '').split('&');
    console.log(uid_index);
    const APIString = "https://cors-anywhere.herokuapp.com/https://api.mihomo.me/sr_info_parsed/" + uid_index[0] + "?lang=en";

    $.ajax({
        url: APIString,
        type: "GET",
        crossDomain: true,
        success: function (data) {
            console.log(data)
            $('.nickname').append('Trailblazer Name: ' + data.player.nickname)
            $('.trail_level').append('Trailblazer Level: ' + data.player.level)
            $('.world_level').append('Equilibrium Level: ' + data.player.world_level)
            $('.uid').append('UID: ' + data.player.uid)

            const api_resource = "https://github.mihomo.me/Mar-7th/StarRailRes/master/";
            const character = data.characters[uid_index[1]];

            $('#img-star_char').attr("src", api_resource + 'icon/deco/Rarity' + character.rarity + '.png')
            $('.img-char').attr("src", api_resource + character.portrait)
            $('#aa_img').attr("src", api_resource + character.skill_trees[0].icon)
            $('#skill_img').attr("src", api_resource + character.skill_trees[1].icon)
            $('#ultimate_img').attr("src", api_resource + character.skill_trees[2].icon)
            $('#talent_img').attr("src", api_resource + character.skill_trees[3].icon)
            $('#tech_img').attr("src", api_resource + character.skill_trees[4].icon)
            $('#aa_lv').append(character.skill_trees[0].level)
            $('#skill_lv').append(character.skill_trees[1].level)
            $('#ultimate_lv').append(character.skill_trees[2].level)
            $('#talent_lv').append(character.skill_trees[3].level)
            $('#char_name').append(character.name)
            $('#char_element-img').attr("src", api_resource + character.element.icon)
            $('#char_lv').append('Lv. ' + character.level)
            $('#char_path-img').attr("src", api_resource + character.path.icon)
            $('#char_path-text').append(character.path.name)
            $('#eidolon').append('Eidolon ' + character.rank)
            $('#hp-base').append(character.attributes[0].display)
            $('#atk-base').append(character.attributes[1].display)
            $('#def_base').append(character.attributes[2].display)
            $('#spd-base').append(character.attributes[3].display)
            $('#hp-sum').append(character.attributes[0].display)
            $('#atk-sum').append(character.attributes[1].display)
            $('#def_sum').append(character.attributes[2].display)
            $('#spd-sum').append(character.attributes[3].display)
            $('#err-value').append("0%")
            $('#ehr-value').append("0%")
            $('#er-value').append("0%")
            var cr_base = character.attributes[4].value;
            var cd_base = character.attributes[5].value;
            $('#cr-value').append(character.attributes[4].display)
            $('#cd-value').append(character.attributes[5].display)
            for (var i = 0; i < character.additions.length; i++) {
                switch (character.additions[i].field) {
                    case "atk":
                        {
                            $('#atk-delta').append('+' + character.additions[i].display)
                            var atk = character.attributes[1].value + character.additions[i].value;
                            $('#atk-sum').empty()
                            $('#atk-sum').append(Math.round(atk))
                        }                       
                        break;
                    case "def":
                        {
                            $('#def_delta').append('+' + character.additions[i].display)
                            var def = character.attributes[2].value + character.additions[i].value;
                            $('#def_sum').empty()
                            $('#def_sum').append(Math.round(def))
                        }   
                        break;
                    case "hp":
                        {
                            $('#hp-delta').append('+' + character.additions[i].display)
                            var hp = character.attributes[0].value + character.additions[i].value;
                            $('#hp-sum').empty()
                            $('#hp-sum').append(Math.round(hp))
                        }    
                        break;
                    case "spd":
                        {
                            $('#spd-delta').append('+' + character.additions[i].display)
                            var spd = character.attributes[3].value + character.additions[i].value;
                            $('#spd-sum').empty()
                            $('#spd-sum').append(Math.round(spd))
                        }    
                        break;
                    case "crit_rate": {
                        var crit = (cr_base + character.additions[i].value)*100;
                        $('#cr-value').empty()
                        $('#cr-value').append(crit.toFixed(1)+'%')
                    }
                    break;
                case "crit_dmg": {
                    var crit_dmg = (cd_base + character.additions[i].value)*100;
                    $('#cd-value').empty()
                    $('#cd-value').append(crit_dmg.toFixed(1)+'%')
                }
                break;
                case "effect_hit":
                    {
                        $('#ehr-value').empty();
                        $('#ehr-value').append(character.additions[i].display)
                    }                 
                    break;
                case "effect_res":
                    {
                        $('#er-value').empty();
                        $('#er-value').append(character.additions[i].display)
                    }   
                    break;
                case "sp_rate":
                    $('#err-value').empty()
                    $('#err-value').append(character.additions[i].display)
                    break;
                case "break_dmg":
                    $('#be-value').append(character.additions[i].display)
                    break;
                case "lightning_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "fire_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "quantum_dmg": {
                    debugger;
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "physical_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "ice_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "imaginary_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                case "wind_dmg": {
                    $('#edb_icon').attr("src", api_resource + character.additions[i].icon)
                    $('#edb_text').append(character.additions[i].name)
                    $('#edb_value').append(character.additions[i].display)
                }
                break;
                }
            }
            $('#weapon-name').append(character.light_cone.name)
            $('.img-weapon').attr("src", api_resource + character.light_cone.icon)
            $('#weapon-star').attr("src", "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/deco/Rarity"+character.light_cone.rarity+".png")
            $('#weapon-level').append('Lv. '+character.light_cone.level)
            $('#weapon-super').append('Superimposition '+character.light_cone.rank)

            for(var i = 0; i < 6; i++) {
                $( "#icon-relic\\["+i+"\\]" ).attr("src", api_resource + character.relics[i].icon)
                var name_relic = character.relics[i].name.replace("'", '&#39;');
                $( "#name-relic\\["+i+"\\]").append(name_relic)
                $( "#star-relic\\["+i+"\\]").attr("src", "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/deco/Rarity"+character.relics[i].rarity+".png")
                $( "#level-relic\\["+i+"\\]").append('+'+character.relics[i].level)
                $( "#main-stat-name-relic\\["+i+"\\]").append(character.relics[i].main_affix.name)
                $( "#main-stat-value-relic\\["+i+"\\]").append(character.relics[i].main_affix.display)
                $( "#sub-stat1-name-relic\\["+i+"\\]").append(character.relics[i].sub_affix[0].name)
                $( "#sub-stat1-value-relic\\["+i+"\\]").append(character.relics[i].sub_affix[0].display)
                $( "#sub-stat2-name-relic\\["+i+"\\]").append(character.relics[i].sub_affix[1].name)
                $( "#sub-stat2-value-relic\\["+i+"\\]").append(character.relics[i].sub_affix[1].display)
                $( "#sub-stat3-name-relic\\["+i+"\\]").append(character.relics[i].sub_affix[2].name)
                $( "#sub-stat3-value-relic\\["+i+"\\]").append(character.relics[i].sub_affix[2].display)
                $( "#sub-stat4-name-relic\\["+i+"\\]").append(character.relics[i].sub_affix[3].name)
                $( "#sub-stat4-value-relic\\["+i+"\\]").append(character.relics[i].sub_affix[3].display)
            }
        }
    });
}